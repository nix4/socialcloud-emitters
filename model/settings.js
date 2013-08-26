module.exports = function(mongoose){
    var TABLE = 'Settings';

/*
var mongoose = require('mongoose'),
	db = require('./baseRepo'),
*/
	Schema = mongoose.Schema;

//db.init();

    return {
        _schema: new Schema({
            key: String,
            value: String
        }),

        getByKey: function(key, callback) {
            var model = mongoose.model(TABLE, this._schema);
            model.findOne({key: key}, callback);
        },

        getByKeyWithDefault: function(key,  defaultValue, callback ) {
            var self = this;

            console.log("Getting key: " + key + " with default value: " + defaultValue);
            var model = mongoose.model(TABLE, this._schema);
            model.findOne({key: key}, function(err, obj) {
                console.log("Settings info:");
                console.log(err);
                console.log(obj);
                if(obj)
                    callback(obj);
                else
                    self.add(key, defaultValue, function(){
                        self.getByKeyWithDefault(key,  defaultValue, callback);
                    });
            });
        },

        getAll: function(callback) {
            var model = mongoose.model(TABLE, this._schema);
            model.find({}, callback);
        },

        add: function(key, value, callback) {
            var model = mongoose.model(TABLE, this._schema);
            var data = new model();
            console.log("upserting key: " + key + " with value: " + value );
            model.update({
                key: key
            }, {
                $set: {
                    value: value
                }
            }, {
                upsert: true
            }, callback);
        }
    }
}