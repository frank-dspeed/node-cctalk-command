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
