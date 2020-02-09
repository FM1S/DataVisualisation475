module.exports = async function(f, opts) {
    const Mongoose = require("mongoose");
    const Complex = Mongoose.model("complexes");

    f.get('/deleteComplexById/:id', async (req, res)=>{
        Complex.deleteOne({_id: req.params.id}, function (err) {
            if(err) res.send({code:400});
            else res.send({code:200});
        })
    })
};