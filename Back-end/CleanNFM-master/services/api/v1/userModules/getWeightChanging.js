module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const User = Mongoose.model("user");

    f.get('/getWeightChanging/:login', async (req, res)=>{
        let user = new User({login: req.params.login});

        User.findOne({login: req.params.login}).select('weight date').exec(function (err, pass) {
            if(err) res.send({code:400});
            else {
                res.send({code:200, weight: pass.weight, date: pass.date});
            }
        })
    })
};