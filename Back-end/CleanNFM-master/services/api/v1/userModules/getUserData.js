module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const User = Mongoose.model("user");

    f.get('/getUserData/:login', async (req, res)=>{
        let user = new User({login: req.params.login});

        User.findOne({login: req.params.login}).select('sex height curWeight difficult isComplexExist').exec(function (err, pass) {
            if(err) res.send({code:400});
            else {

		        res.send({code:200, sex: pass.sex, height: pass.height, curWeight: pass.curWeight, difficult: pass.difficult, isComplexExist: pass.isComplexExist});
		    }
        })
    })
};