const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

//making a schema
const User=new Schema({
    name: String,
    email: String,
    password: String
});

const Todo=new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
});

//model
const usermodel=mongoose.model('user',User);
const todomodel=mongoose.model('todo',Todo);

//exporting
module.exports={
    usermodel,
    todomodel
}