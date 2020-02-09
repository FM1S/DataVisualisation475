module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Complex = Mongoose.model("complexes");

    f.post('/updateComplexById/', (req, res)=>{
        Complex.findById(req.body.complexId).exec(function (err, complex) {
            if(err) res.send({code:400});
            if(!complex) res.send({code:228});
            else {
                complex.name = req.body.name;
                complex.sex = req.body.sex;
                complex.description = req.body.description;
                complex.difficult = req.body.difficult;
                complex.category = req.body.category;
                complex.minWeight = req.body.minWeight;
                complex.maxWeight = req.body.maxWeight;
                complex.save();
                res.send({code:200});
            }
        })
    })
};