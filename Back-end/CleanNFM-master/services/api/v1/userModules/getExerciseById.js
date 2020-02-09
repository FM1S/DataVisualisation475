module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Exercise = Mongoose.model("exercise");

    f.get('/getExerciseById/:id', (req, res)=>{
        Exercise.findById(req.params.id).exec(function (err, exercise) {
            if(err) res.send({code:400});
            if(!exercise) res.send({code:228});
            else res.send({code:200, exercise: exercise})
        })
    })
};