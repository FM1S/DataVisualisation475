module.exports = async function(f, opts){
    const Mongoose = require("mongoose");
    const Complex = Mongoose.model("complexes");

    f.get('/getComplexes', async (req, res)=>{
        let complex = new Complex({category: req.params.category});

        Complex.find().exec(function (err, complexes) {
            if(err) res.send({code:400});
            else res.send({code:200, complexList: complexes});
        })
    })
};