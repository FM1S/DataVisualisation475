module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Schema = Mongoose.Schema;
    const Complexes = Mongoose.model("complexes");
    const Exercises = Mongoose.model("exercise");

    f.get('/getUserComplexByParams/:login/:sex/:weight/:difficult/:category', (req, res)=> {
        let complex = Complexes.find({
            sex: req.params.sex,
            minWeight: {$lte: req.params.weight},
            maxWeight: {$gte: req.params.weight},
            difficult: req.params.difficult,
            category: req.params.category
        });

        complex.exec(function (err, tmp) {
            let docNum = Math.floor(Math.random() * tmp.length);
            Exercises.find({_id: {$in: tmp.exercises}}).exec(function (err, exercises) {
                if(err) res.send({code:400});
                else res.send({code:200, complex: tmp.length, num: docNum});
            })
            //res.send({code:200, complexName: tmp[0].name});
        });
    })
};