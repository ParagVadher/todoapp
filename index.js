const express = require('express');
const app = express();
const port = 8000;

// json data debug
const bodyParser = require('body-parser').json();

// require the task model from config folder
const task = require('./models/tasks');

// require teh config mongoose file
const db1 = require('./config/mongoose');

// view engine is ejs as requested
app.set('view engine', 'ejs');

// Use url encoding to fetch data from ejs forms in encoded form(big error if this gaayab)
app.use(express.urlencoded({extended: true}));

// display tasks
app.get('/', function(req, res){
    // console.log('1. This is the request: ', req);
    task.find({}, function(err, tasks){
        if(err){
            console.log('Error aa gaya: ', err);
            return;
        }

        res.render('run.ejs', 
        {
            eTask: tasks
        });
    });
});

// create the task
app.post('/', async function (req, res) {
    // to print it on the console, remove it when model is ready
    // console.log(req.body);

    try {
        let task1 = await task.create({
            content: req.body.task0
        })

        task1.save();
        res.redirect('/');
    } catch (err) {
        console.log('Error in creating task(prolly blank task added): ', err);
        return;
    }
});

// update the task
app.route('/edit/:id').get(function(req, res){
    console.log(req.params.id);
    let id = req.params.id;
    task.find({}, function(err, tasks){
        if(err){
            console.log('Error in updating: ', err);
            return;
        }

        res.render('edito.ejs', 
        {
            eTask: tasks,
            id0: id
        });
    });
}).post(function(req, res){
    let id1 = req.params.id;
    task.findByIdAndUpdate(id1, {
        content: req.body.task0
    }, function(err){
        if(err){
            return res.send(500, err);
        }
        res.redirect('/');
    });
});

// delete task
app.route("/delete/:id").get((req, res) => {
    const id = req.params.id;
    task.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.redirect("/");
    });
});

// apis
// api - list tasks
app.get('/api/list', async function(req, res){
    let task0 = await task.find({});

    return res.status(200).json({
        message: "List of all tasks",
        task: task0
    });
});

// api - deletes tasks
app.delete('/api/:id', async function(req, res){

    try {
        let task0 = await task.findById(req.params.id);
        task0.remove();
        return res.json(200, {
            message: "Task deleted"
        })
    } catch (err) {
        console.log('Error found: ', err);
        return res.status(500).json({
                message: "Internal server error"
            });
    }

});

// api - creates task
app.post('/api/create', bodyParser, async function(req, res){
    const data = new task({
        content: req.body.content
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// updates task
app.patch('/api/update/:id', async function(req, res){
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        console.log('** updated data: ', updatedData);
        const result = await task.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.listen(port, function(err){
    if(err){
        console.log(`error in connecting to port ${port}`);
        return;
    }

    console.log(`Connected successfully to post ${port}`);

});