const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

const userSchema = new Schema(
    {
     username: {
         type: String,
         unique: true,
         required: true,
         max_length: 15,
     },
     email: {
         type: String,
         unique: true,
         required: true,
         validate: [validateEmail, 'Please fill a valid email address'],
     },
     thoughts: [
         {
             type: Schema.Types.ObjectId,
             ref: 'Thoughts',
         },
     ],

     friends: [
         {
             type: Schema.Types.ObjectId,
             ref: 'User',
         },
     ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;