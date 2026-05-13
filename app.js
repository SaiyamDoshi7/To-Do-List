const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use(express.static('public'));

let Students = [
    {
        id: 101,
        name: "Saiyam",
        courseName: "Full Stack",
        status: "Pending"
    },
    {
        id: 102,
        name: "Kalp",
        courseName: "Frontend",
        status: "Completed"
    }
];

// Dashboard Page
app.get('/', (req, res) => {

    let totalTasks = Students.length;

    let pendingTasks = Students.filter((student) => {
        return student.status == "Pending";
    }).length;

    let completedTasks = Students.filter((student) => {
        return student.status == "Completed";
    }).length;

    res.render('dashboard', {
        Students,
        totalTasks,
        pendingTasks,
        completedTasks
    });

});

// Add Task Page
app.get('/add-task', (req, res) => {
    res.render('add-task');
});

// Insert Task
app.post('/insert-task', (req, res) => {

    Students.push(req.body);

    res.redirect('/');

});

// Delete Task
app.get('/delete-task', (req, res) => {

    let id = req.query.id;

    Students = Students.filter((student) => {
        return student.id != id;
    });

    res.redirect('/');

});

// Edit Task Page
app.get('/edit-task', (req, res) => {

    let id = req.query.id;

    let singleData = Students.find((student) => {
        return student.id == id;
    });

    res.render('edit-task', {
        singleData
    });

});

// Update Task
app.post('/update-task', (req, res) => {

    let id = req.body.id;

    Students = Students.map((student) => {

        if (student.id == id) {

            student.name = req.body.name;
            student.courseName = req.body.courseName;
            student.status = req.body.status;

        }

        return student;

    });

    res.redirect('/');

});

app.listen(port, (err) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log("Server Running On Port 8000");
    }

});