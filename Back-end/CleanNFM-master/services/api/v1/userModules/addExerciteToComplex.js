module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Complex = Mongoose.model("complexes");
    const Exercise = Mongoose.model("exercise");


    f.post('/addExerciseToComplex/', (req, res)=>{
        let exercise = new Exercise({
            name: req.body.name,
            minWeight: 0,
            maxWeight: 0,
            description: req.body.description,
            category: req.body.category,
            sex: req.body.sex,
            amount: req.body.amount
        });

        exercise.save();

        Complex.findById(req.body.complexId, function (err, complex) {
            if(err) res.send({code:400});
            else{
                complex.exercises.push(exercise._id);
                complex.save();
                res.send({code:200});
            }
        })
        /*Complex.findById(req.body.complexId, function (err, complex) {
            Exercise.findOne({
                name: req.body.name,
                minWeight: 0,
                maxWeight: 0,
                description: req.body.description,
                category: req.body.category,
                sex: req.body.sex,
                amount: req.body.amount
            }).select('_id').exec(function (err, tmp) {
                if(err) res.send({code:400});
                else {
                    complex.exercises.push(tmp._id);
                    complex.save();
                    res.send({code:200});
                }
            })
        });*/
    })

    /*f.get('/addExerciseToComplex/:id/:name/:description/:category/:sex/:amount', async (req, res)=>{

        console.log(req.body);

        let exercise = new Exercise({
            name: req.params.name,
            minWeight: 0,
            maxWeight: 0,
            description: strDescription,
            category: req.params.category,
            sex: req.params.sex,
            amount: req.params.amount
        });

        await exercise.save();

        Complex.findById(req.params.id, function (err, complex) {
            Exercise.findOne({
                name: req.params.name,
                minWeight: 0,
                maxWeight: 0,
                description: req.params.description,
                category: req.params.category,
                sex: req.params.sex,
                amount: req.params.amount
            }).select('_id').exec(function (err, tmp) {
                if(err) res.send({code:400});
                else {
                    complex.exercises.push(tmp._id);
                    complex.save();
                    res.send({code:200});
                }
            })
        });
    });*/
};