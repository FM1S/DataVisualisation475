module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const User = Mongoose.model("user");

    f.get('/addComplexToUser/:login', async (req, res)=>{

        User.findOne({login: req.params.login}, function (err, login) {
            if(err) res.send({code:400});
            if(!login) res.send({code:228});
            else{
                login.isComplexExist = true;
                login.save();
                res.send({code:200});
            }
        });
    });
};