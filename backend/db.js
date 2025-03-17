require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log("Connected to MongoDB");

            try {
                const foodCollection = mongoose.connection.db.collection("food_items");
                const data = await foodCollection.find({}).toArray();

                const categoryCollection = mongoose.connection.db.collection("Categories");
                const Catdata = await categoryCollection.find({}).toArray();

                callback(null, data, Catdata);
            } catch (error) {
                console.error("Error fetching collections:", error);
                callback(error, null, null);
            }
        })
        .catch(err => {
            console.error("MongoDB Connection Error:", err);
        });
};
