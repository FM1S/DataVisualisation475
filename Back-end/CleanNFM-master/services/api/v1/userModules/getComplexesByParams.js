module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Complex = Mongoose.model("complexes");

    f.post('/getComplexesByParams/', (req, res)=>{
        Complex.find({
            sex: req.body.sex,
            minWeight: {$gte: req.body.minWeight},
            maxWeight: {$lte: req.body.maxWeight},
            difficult: req.body.difficult,
            category: req.body.category
        }).exec(function (err, complex) {
            if(err) res.send({code:400});
            else res.send({code:200, complexList: complex})
        })
    })
};