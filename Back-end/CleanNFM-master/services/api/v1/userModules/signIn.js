module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const User = Mongoose.model("user");
    const jsonStringify = require('fast-json-stringify');

    f.get('/signIn/:login/:password', async (req, res) => {
        let user = new User({login: req.params.login, password: req.params.password});

        User.findOne({login: req.params.login, password: req.params.password}, function (err, login) {
            if (login) {
                res.send({code: 200});
                //res.type('json').send({user});
            } else
                res.send({code: 228});
                //res.type('json').send({user});
        });
    })
};