const debug = require('debug');
const crc = require('crc')

class ccTalkMessage {
  // src, dest, command, data, crc
  constructor(src, dest, command, data, crc) {
    //fromBuffer() A buffer always should have a crc checksum already !
    if(src instanceof Uint8Array) {
      // parse command
      this._buffer = src;
      this._src = this._buffer[2];
      this._dest = this._buffer[0];
      this._command = this._buffer[3];
      this._data = this._buffer.slice(4, this._buffer[1]+4);
      // TODO: checksum detection and parsing
      this._checksum = this._buffer[this._buffer[1]+4]
      if (this._checksum == undefined) {
          console.log(this._buffer)
          throw new Error('NO_CHECKSUM');
      } else {
        // Check for CRC8
        if (this.crc8verify()) {
          this._crcType = 8
          debug('ccMessage:crc')('CRC8_CHECKSUM')
        } else if (this.crc16verify()) {
          this._crcType = 16
          debug('ccMessage:crc')('CRC16_CHECKSUM')
        } else {
          debug('ccMessage:crc')(this._buffer)
          throw new Error('WRONG_CHECKSUM');
        }
      }
    } else {
      // create command
      if (command == undefined) {
          debug('ccMessage:command')(this._buffer)
          throw new Error('NO_COMMAND');
      } else if (data == undefined) {
          debug('ccMessage:command')(this._buffer)
          throw new Error('NO_DATA');
      }
      this._src = typeof src != undefined ? src : 1;
      this._dest = typeof dest != undefined ? dest : 2;
      this._crcType = typeof crc != undefined ? crc : 8
      this._command = command;
      this._data = data;
    }
  }
  toBuffer() {
    if (this._buffer == undefined) {
      this._buffer = new Uint8Array(5 + this._data.length);
      this._buffer[0] = this._dest;
      this._buffer[1] = this._data.length;
      this._buffer[2] = this._src;
      this._buffer[3] = this._command;
      this._buffer.set(this._data, 4);
      // console.log('CRC: ', this._crcType)
      if (this._crcType === 8) {
        return this.crc8()
      } else {
        return this.crc16()
      }
    } else {
      return this._buffer
    }
  }
  crc8() {
    var sum = 0;
    for (var i=0; i < (this._buffer.length - 1); ++i)
      sum += (this._buffer[i]);
    // Set Checksum at end
    this._buffer[this._data.length+4] = 0x100 - sum%0x100;
    return this._buffer;
  }
  crc8verify() {
    var sum = 0;
    for (var i=0; i < (this._buffer.length - 1); ++i) {
      sum += (this._buffer[i]);
    }

    if (this._buffer[this._data.length+4] != 0x100 - sum%0x100) {
      return false;
    } else {
      return true
    }
  }
  crc16() {
    //CRC16-CCITT-xModem signed Buffer
    var UArray = new Uint8Array([this._buffer[0],this._buffer[1],this._buffer[3]])
    var CRCArray = require('crc').crc16xmodem(Buffer.from(UArray))
        .toString(16)
        .match(/.{1,2}/g)
        .map((val)=> parseInt(val, 16))
        .reverse()
    // console.log(CRCArray)
    // Set Checksum first Part at src
    this._buffer.set([CRCArray[0]],2)
    // Set Checksum Secund Part after data
    this._buffer.set([CRCArray[1]], this._buffer[1]+4) // Position after data aka last
    return this._buffer;
  }
  crc16verify() {
    var UArray = new Uint8Array([this._buffer[0],this._buffer[1],this._buffer[3]])
    var CRCArray = require('crc').crc16xmodem(Buffer.from(UArray))
        .toString(16)
        .match(/.{1,2}/g)
        .map((val)=> parseInt(val, 16))
        .reverse();

    if ((this._buffer[2] == CRCArray[0]) && (this._buffer[this._buffer[1]+4] == CRCArray[1])) {
      return true;
    } else {
      return false;
    }
  }
};
module.exports = exports = ccTalkMessage
