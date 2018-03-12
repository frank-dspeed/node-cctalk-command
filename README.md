# cctalk-command
crc can be 8 or 16


Example
```
cmd = require('cctalk-message')
setAcceptanceMask = cmd(src, dest, command, [data], crc).toBuffer -> <Buffer .. .. .. >

```
