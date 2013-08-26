module.exports = function(mongoose){
    var TABLE = 'SocialMessages';
    var mongooseInitialised = (mongoose)? true: false;
    var db, Schema;

    if(!mongooseInitialised){
        mongoose = require('mongoose');
        db = require('./baseRepo');
    }
        Schema = mongoose.Schema;

    if(!mongooseInitialised)
        db.init();

    return {
        _schema: new Schema({
            id: String,
            type: String,
            content: String,
            size: Number,
            colour: String,
            authorId: String,
            authorName: String,
            authorProfileUrl: String,
            dateTime: Date
        }),
        getAll: function(callback) {
            var model = mongoose.model(TABLE, this._schema);
            model.find({}, callback);
        },

        add: function(msg, callback) {
            var model = mongoose.model(TABLE, this._schema);
            var data = new model();

            model.update({
                id: msg.id
            }, {
                $set: {
                    type: msg.type,
                    size: msg.size,
                    content: msg.content,
                    colour: msg.colour,
                    authorId: msg.authorId,
                    authorName: msg.authorName,
                    authorProfileUrl: msg.authorProfileUrl,
                    dateTime: msg.dateTime
                }
            }, {
                upsert: true
            }, callback);
        }

    }
}