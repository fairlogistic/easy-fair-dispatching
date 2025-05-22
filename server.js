
// Easy-Fair Dispatching - Backend Server
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define path for storing tasks
const tasksFile = path.join(__dirname, 'tasks.json');

// Ensure tasks.json file exists
if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify([]));
}

// Endpoint to receive and save tasks
app.post('/create-task', (req, res) => {
    const newTask = req.body;

    try {
        const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));
        tasks.push({
            id: Date.now(),
            ...newTask
        });

        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
        console.log('✅ Task saved:', newTask);

        res.status(201).json({ message: 'Task saved successfully!' });
    } catch (err) {
        console.error('❌ Error saving task:', err);
        res.status(500).json({ message: 'Failed to save task.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Easy-Fair Dispatching backend running on http://localhost:${PORT}`);
});
