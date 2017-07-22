# cctalk-command

Example
```
cmd = require('cctalk-message')
setAcceptanceMask = cmd(src, dest, command, [data], crc).toBuffer -> <Buffer .. .. .. >
```
