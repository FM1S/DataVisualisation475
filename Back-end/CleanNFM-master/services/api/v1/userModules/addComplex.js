module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Complex = Mongoose.model("complexes");

    f.post('/addComplex/', (req, res)=>{

        let complex = new Complex({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            sex: req.body.sex,
            difficult: req.body.difficult,
            minWeight: req.body.minWeight,
            maxWeight: req.body.maxWeight
        });

        complex.save();

        res.send({code:200, id: complex._id});

        /*Complex.findOne({
            name: req.body.name,
            sex: req.body.sex,
            description: req.body.description,
            difficult: req.body.difficult,
            category: req.body.category,
            minWeight: req.body.minWeight,
            maxWeight: req.body.maxWeight
        }).exec(function (err, tmp) {
            if(err) {
                res.send({code:400});
            }
            else{
                res.send({code:200, id: tmp._id})
            }
        });*/
    })
};