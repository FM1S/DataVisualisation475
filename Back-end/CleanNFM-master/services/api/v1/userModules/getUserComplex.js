module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Schema = Mongoose.Schema;
    const User = Mongoose.model("user");
    const Exercise = Mongoose.model("exercise");
    const Complexes = Mongoose.model("complexes");

    f.get('/getUserComplex/:login/:sex/:weight/:difficult/:category', async (req, res)=>{
        let user = new User({login: req.params.login});

        /*let complexInfo = {
            name: String,
            description: String,
            amount: Number
        };*/

        let complexInfo = [];

        Complexes.findOne({
            sex: req.params.sex,
            minWeight: {$lte: req.params.weight},
            maxWeight: {$gt: req.params.weight},
            difficult: req.params.difficult,
            category: req.params.category
        }).select('name exercises').exec(function (err, func) {
            if(err) res.send({code:400});
            else {
                let exerciseIndex = 1;
                for(let i = 0; i < func.exercises.length; i++){
                    Exercise.findById(func.exercises[i]).select('name description amount time').exec(function(err, exercise){
                        if(err) res.send({code:400});
                        else {
                            complexInfo.push({
                                index: exerciseIndex,
                                name: exercise.name,
                                description: exercise.description,
                                amount: exercise.amount
                            });
                            exerciseIndex++;
                            //complexInfo.push(obj);
                            if(i === func.exercises.length - 1) res.send({code:200, complexName: func.name, complexInfo:complexInfo});
                        }

                    })
                }
                //res.send({code:200, complexInfo: func.exercises});
            }
        })
    })
};