module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Exercise = Mongoose.model("exercise");

    f.post('/updateExerciseById/', (req, res)=>{
        Exercise.findById(req.body.exerciseId).exec(function (err, exercise) {
            if(err) res.send({code:400});
            if(!exercise) res.send({code:228});
            else {
                exercise.name = req.body.name;
                exercise.description = req.body.description;
                exercise.category = req.body.category;
                exercise.sex = req.body.sex;
                exercise.amount = req.body.amount;
                exercise.minWeight = req.body.minWeight;
                exercise.maxWeight = req.body.maxWeight;
                exercise.save();
                res.send({code:200});
            }
        })
    })
};