const Task = require('./models/tasks');

module.exports.index = async function(req, res){
    let task = await Task.find({})
    .sort(-createdAt);

    return res.status(200).json({
        message: "List of all tasks",
        task: task
    });
}