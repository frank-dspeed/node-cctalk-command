const assert = require('assert');
const ccMessage = require('./index')




//var myCmd = new Uint8Array([2,0,1,245,8])
var myCmd = new Uint8Array([1,0,2,254,255])
new ccMessage(myCmd)
//var myCmd = new Uint8Array([1,0,2,255])
//new ccMessage(myCmd)
