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
    const insert = await db.insert(req.body);
    res.send(insert);
});

/**
 * Modify single document
 */
app.put('/todos/:id', async (req, res) => {
    const update = await db.update(req.params.id, req.body);    
    res.send(update);
});

/**
 * Delete single document
 */
app.delete('/todos/:id', async (req, res) => {
    const del = await db.delete(req.params.id);
    res.send(del);
});

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })

