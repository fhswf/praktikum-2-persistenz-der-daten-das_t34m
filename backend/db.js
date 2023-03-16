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

    queryById(id) {
        const filter = { _id: new ObjectId(id) }
        return collection.findOne(filter);
    }

    update(id, order) {
        // TODO: Implement update
    }

    delete(id) {
        // TODO: Implement delete
    }

    insert(order) {
        let collection = db.collection(MONGO_DB);
        return collection.insertOne(order);
    }
}
