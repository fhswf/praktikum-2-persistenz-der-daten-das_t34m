import express from 'express';
import DB from './db.js'

const PORT = process.env.PORT || 3000;

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();
app.use(express.json());

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes
//
// YOUR CODE HERE
//
// Implement the following routes:
// GET /todos/:id
// POST /todos
// PUT /todos/:id
// DELETE /todos/:id

/** Return all todos. 
 *  Be aware that the db methods return promises, so we need to use either `await` or `then` here! 
 */
app.get('/todos', async (req, res) => {
    let todos = await db.queryAll();
    res.send(todos);
});

/**
 * Return only one of all todos
 */
app.get('/todos/:id', async (req, res) => {
    const todo = await db.queryById(req.params.id);
    res.send(todo);
});

/**
 * Creates new todo and add it to database
 */
app.post('/todos', async (req, res) => {
    const { title, due, status } = req.body;
    const doc = {
        "title": title,
        "due": due,
        "status": status
    };

    const insert = await db.insert(doc);
    
    res.send(insert);
});

app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const update = await db.update(id, data);
    
    res.send(update);
});

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;

    const del = await db.delete(id);

    res.send(del);
});

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })

