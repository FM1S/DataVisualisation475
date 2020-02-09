module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Exercise = Mongoose.model("exercise");

    f.get('/getExercises', async (req, res)=>{
        Exercise.find().exec(function (err, exercise) {
            if(err) res.send({code:400});
            else res.send({code:200, exerciseList: exercise});
        })
    })
};