const assert = require('assert');
const ccMessage = require('../')

describe('cctalk-message', function() {
  describe('ccMessage(new Uint8Array([1,0,2,255,252]))', function() {
    it('should throw Error("WRONG_CHECKSUM")', function() {
      try {
        var result = new ccMessage(new Uint8Array([1,0,2,255,252]))
        // The line will only be hit if no error is thrown above!
        throw new Error('Expected new Error("WRONG_CHECKSUM")')
      } catch(err) {
        var expected = 'WRONG_CHECKSUM'
        assert.equal(err.message, expected)
      }
    });
  });

  describe('ccMessage(new Uint8Array([2,0,1,245,8])).crc8verify', function() {
    it('should return true', function() {
        var result = new ccMessage(new Uint8Array([2,0,1,245,8]))
        assert.equal(result.crc8verify(), true)
    });
  });

  describe('ccMessage(new Uint8Array([1,0,2,255]))', function() {
    it('should throw Error("NO_CHECKSUM")', function() {
      try {
        var result = new ccMessage(new Uint8Array([1,0,2,255]))
        // The line will only be hit if no error is thrown above!
        throw new Error('Expected new Error("NO_CHECKSUM")')
      } catch(err) {
        var expected = 'NO_CHECKSUM'
        assert.equal(err.message, expected)
      }
    });
  });
});
