const res = require('express/lib/response');
const {User} = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err)=> res.status(500).json(err));
    },
    getSingleUser (req,res){
        User.findOne( {_id: req.params.userId} )
        .select('-__v')
        .then((user)=>
        !user
            ? res.status(404).json({message: 'No User with that ID'})
            : res.json(user)
        )
        .catch((err)=> res.status(505).json(err));
    },
    createUser(req, res){
        User.create(req.body)
        .then((user)=> res.json(user))
        .catch((err)=> {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((user)=>
                !user
                    ? res.status(404).json({message: "No user with this ID"})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user)=>
                !user
                    ? res.status(404).json({message: "No User with this ID"})
                    : User.deleteMany({ _id: {$in: user.thoughts }})
            )
            .then(()=> res.json({message: 'User and thoughts deleted'}))
            .catch((err)=> res.status(500).json(err));
    },
    createFriend(req,res){
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {runValidators: true, new: true})
        .then((userData)=>
                !userData
                    ? res.status(404).json({message: "No user with this ID"})
                    : res.json(userData)
        )
        .catch((err)=> res.status(500).json(err));    
    },
    deleteFriend(req,res){
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {runValidators: true, new: true})
        .then((userData)=>
                !userData
                    ? res.status(404).json({message: "No user with this ID"})
                    : res.json(userData)
        )
        .catch((err)=> res.status(500).json(err));  
    },
};