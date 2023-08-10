var express = require("express")
var app = express();
var router = express.Router();


router.get('/',(req,res)=>{
    res.send("O PAI Tá ON !!")
})
module.exports = router;