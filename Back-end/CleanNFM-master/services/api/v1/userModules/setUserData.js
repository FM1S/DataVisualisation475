module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const User = Mongoose.model("user");

    f.get('/setUserData/:login/:sex/:height/:curWeight/:difficult', async (req, res)=>{
        let user = new User({login: req.params.login});

        User.findOne({login: req.params.login}, function (err, login) {
            if(err) res.send({code:400});
            if(!login) res.send({code:228});
            else{
                login.sex = req.params.sex;
                login.height = req.params.height;
                login.curWeight = req.params.curWeight;
                login.weight.push(req.params.curWeight);
                login.date.addToSet(new Date);
                login.difficult = req.params.difficult;
                login.save();
                res.send({code:200, sex: login.sex, height: login.height, curWeight: login.curWeight, difficult: login.difficult});
            }
        });
    })
};