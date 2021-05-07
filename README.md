# (deprecated) in favor of https://github.com/frank-dspeed/esnext-cctalk/blob/main/src/cctalk.js
https://github.com/frank-dspeed/esnext-cctalk/blob/main/src/cctalk.js offers WebStream API and NodeJS Stream API Compatible functional parser. Works also Well in v8::isolates via https://github.com/stealify/stealify and es4x/graaljs projects that are using Javas SerialPort Implementation.

it also offers a CCTalkCommandCompat function that should be 100% Compatible.


# node-cctalk-command
This can generate crc checksums and accepts crc as int 8 or 16 this supports data as array rest is int.


Example
```
cmd = require('node-cctalk-command')
setAcceptanceMask = new cmd(src, dest, command, [data], crc).toBuffer -> <Buffer .. .. .. >

```
## Usage
```
const CcTMessage = require('./index')

//var myCmd = new Uint8Array([2,0,1,245,8])
//var myCmd = new Uint8Array([1,0,2,255])
var myCmd = new Uint8Array([1, 0, 2, 254, 255])
new ccMessage(myCmd)
```
