const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/cakeFactory';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');
    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        //return db.collection('dishes').remove(); issue -> as need a lower version in package.json
        return Dishes.remove({});
    })
    .then(() => {
        //return db.close(); issue -> as need a lower version in package.json
        return mongoose.disconnect()       
    })
    .catch((err) => {
        console.log(err);
    });
});
