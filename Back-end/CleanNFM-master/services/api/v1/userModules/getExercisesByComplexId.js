module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Schema = Mongoose.Schema;
    const User = Mongoose.model("user");
    const Exercise = Mongoose.model("exercise");
    const Complexes = Mongoose.model("complexes");

    f.get('/getExercisesByComplexId/:id', async (req, res)=>{
        let user = new User({login: req.params.login});

        let complexInfo = [];

        Complexes.findOne({_id: req.params.id}).select('name exercises').exec(function (err, func) {
            if(err) res.send({code:400});
            else {
                let exerciseIndex = 1;
                for(let i = 0; i < func.exercises.length; i++){
                    Exercise.findById(func.exercises[i]).select('name description amount').exec(function(err, exercise){
                        if(err) res.send({code:400});
                        else {
                            complexInfo.push({
                                index: exerciseIndex,
                                name: exercise.name,
                                description: exercise.description,
                                amount: exercise.amount
                            });
                            exerciseIndex++;
                            if(i === func.exercises.length - 1) res.send({code:200, complexName: func.name, complexInfo:complexInfo});
                        }
                    })
                }
            }
        })
    })
};