module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Exercise = Mongoose.model("exercise");

    f.get('/updateSex', (req, res)=>{
        Exercise.updateMany({sex: "женский"}, {$set:{sex:"Женский"}}).exec(function (err, exercise) {
                res.send({code:200});
            })
    })
};