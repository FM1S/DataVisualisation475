const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
    {
        id: String,
        login: String,
        password: String,
        sex: String,
        weight: [String],
        date: [Date],
        curWeight: String,
        height: String,
        difficult: String,
        isComplexExist: Boolean
    }
);

const AdminSchema = new Schema({
        id: String,
        login: String,
        password: String
});

const ExercisesSchema = new Schema({
        id: String,
        name: String,
        minWeight: Number,
        maxWeight: Number,
        description: String,
        category: String,
        sex: String,
        amount: Number
});

const ComplexesSchema = new Schema({
        id: String,
        name: String,
        sex: String,
        description: String,
        difficult: String,
        exercises: [String],
        category: String,
        minWeight: Number,
        maxWeight: Number
});

UserSchema.methods = {};
Mongoose.model("user", UserSchema);
Mongoose.model("exercise", ExercisesSchema);
Mongoose.model("complexes", ComplexesSchema);
Mongoose.model("admins", AdminSchema);