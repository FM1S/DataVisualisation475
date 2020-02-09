module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Admin = Mongoose.model("admins");
    const jsonStringify = require('fast-json-stringify');

    f.get('/signInAdmin/:login/:password', async (req, res) => {
        let admin = new Admin({login: req.params.login, password: req.params.password});

        Admin.findOne({login: req.params.login, password: req.params.password}, function (err, login) {
            if (login) {
                res.send({code: 200});
                //res.type('json').send({user});
            } else
                res.send({code: 228});
            //res.type('json').send({user});
        });
    })
};