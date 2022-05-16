const { Schema, model } = require('mongoose');

const Reaction = require('./Reactions');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
);

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;