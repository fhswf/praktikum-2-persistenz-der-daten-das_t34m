import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';
const MONGO_DB = process.env.MONGO_DB || 'todos';

let db = null;
let collection = null;
export default class DB {
    connect() {
        return MongoClient.connect(MONGO_URI)
            .then(function (client) {
                db = client.db(MONGO_DB);
                collection = db.collection('todos');
            });
    }

    queryAll() {
        return collection.find().toArray();
    }

    /**
     * Find a single database document
     * @param {document id} id 
     * @returns the document by given id
     */
    queryById(id) {
        return collection.findOne(getDocumentID(id));
    }

    /**
     * Update a single database document by given id
     * @param {document id} id 
     * @param {data to update} order 
     * @returns the updated document
     */
    update(id, order) {
        return collection.updateOne(getDocumentID(id), { $set: createDocument(order) });
    };

    /**
     * Delete a single database document by given id
     * @param {document id} id 
     * @returns the deleted document
     */
    delete(id) {
        return collection.deleteOne(getDocumentID(id));
    };

    /**
     * Creates a new database document (id is system generated)
     * @param {data to store} order 
     * @returns the stored document
     */
    insert(order) {
        const collection = db.collection(MONGO_DB);
        return collection.insertOne(createDocument(order));
    };
}

/**
 * Change an id given as string to a MongoDB specific ObjectId
 * @param {id string} id 
 * @returns the MongoDB ObjectId
 */
function getDocumentID(id) {
    return { _id: new ObjectId(id) };
}

/**
 * Format the req.body to JSON format
 * @param {request body} data 
 * @returns the request body in json format
 */
function createDocument(data) {
    const { title, due, status } = data;
    return {
        "title": title,
        "due": due,
        "status": status
    };
}