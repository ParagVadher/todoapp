const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
    content:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;