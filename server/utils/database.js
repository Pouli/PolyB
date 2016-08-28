'use strict';

const Promise = require('bluebird');
const MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);
let db;

exports.connect = () => {
    return MongoClient.connectAsync('mongodb://localhost:27017/polymer')
        .then(database => db = database);
};

exports.find = (collection, selector) => {
    return db.collection(collection).find(selector).toArray();
};

exports.findOne = (collection, selector) => {
    return db.collection(collection).findOne(selector);
};

exports.findById = (collection, id) => {
    return db.collection(collection).findById(id);
};

exports.insert = (collection, doc) => {
    return db.collection(collection).insertOne(doc);
};

