module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Exercise = Mongoose.model("exercise");
    const Complex = Mongoose.model("complexes");

    f.get('/deleteExerciseById/:id', async (req, res)=>{
        Exercise.deleteOne({_id: req.params.id}, function (err) {
            if(err) res.send({code:400});
            else{
                Complex.update({exercises: {$regex: req.params.id}},{$pull: {exercises: req.params.id}}).exec(function (err, complex) {
                    if(err) res.send({code:400});
                    else res.send({code:200});
                })
            }
        })
    })
};