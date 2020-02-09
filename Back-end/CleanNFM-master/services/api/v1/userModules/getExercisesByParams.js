module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Exercise = Mongoose.model("exercise");

    f.post('/getExercisesByParams/', (req, res)=>{
        Exercise.find({
            sex: req.body.sex,
            minWeight: {$gte: req.body.minWeight},
            maxWeight: {$lte: req.body.maxWeight},
            //difficult: req.body.difficult,
            category: req.body.category
        }).exec(function (err, tmp) {
            if(err) res.send({code:400});
            if(!tmp) res.send({code:228});
            else res.send({code:200, exList: tmp})
        })
    })
};