import Realm from 'realm';

class LastLocation extends Realm.Object {
}

LastLocation.schema = {
    name: 'LastLocation',
    primaryKey: 'uuid', //ou can specify the primaryKey property in an object model for string and int properties. Declaring a primary key allows objects to be looked up and updated efficiently and enforces uniqueness for each value.
    properties: {
        uuid: 'string',
    },
};

class FailedPersists extends Realm.Object {
}

FailedPersists.schema = {
    name: 'FailedPersists',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        timeStamp: 'string',
    },
};

class LastDataCollect extends Realm.Object {
}

LastDataCollect.schema = {
    name: 'LastDataCollect',
    primaryKey: 'id',
    properties: {
        id: 'int',
        timeStamp: 'string'
    }
}


export default new Realm({schema: [LastLocation, FailedPersists, LastDataCollect]});