// const { MongoClient } = require('mongodb');

// const mongoURI = 'mongodb+srv://root:root@cluster0.bessnql.mongodb.net/gofoodMern?retryWrites=true&w=majority&appName=Cluster0';

// async function connectToMongo() {
//     try {
//         const client = new MongoClient(mongoURI);
//         await client.connect();
//         console.log("Connected to MongoDB");

//         // Now you can access collections and perform operations
//         const db = client.db('gofoodMern');
//         const collection = db.collection('food_items');

//         // Example: Perform an operation (e.g., find documents)
//         const documents = await collection.find({}).toArray();
//         console.log(documents);
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// module.exports = connectToMongo;
// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://root:root@ac-u4mkogu-shard-00-00.bessnql.mongodb.net:27017,ac-u4mkogu-shard-00-01.bessnql.mongodb.net:27017,ac-u4mkogu-shard-00-02.bessnql.mongodb.net:27017/gofoodMern?ssl=true&replicaSet=atlas-kuhi78-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

// async function connectToMongo() {
//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true},async(err,result)=>{
//             if(err) console.log(err);
//             else{
//                 console.log("Connected to MongoDB");
//                 const fetched_data=await mongoose.connection.db.collection("food_items");
//                 fetched_data.find({}).toArray(function(err,data){
//                     if(err) console.log(err);
//                     else{
//                         global.food_items=data;
//                     }
//                 })
//             }
//         }); 
        
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// module.exports = connectToMongo;

const mongoose = require('mongoose');

const mongoURI = 'mongodb://root:root@ac-u4mkogu-shard-00-00.bessnql.mongodb.net:27017,ac-u4mkogu-shard-00-01.bessnql.mongodb.net:27017,ac-u4mkogu-shard-00-02.bessnql.mongodb.net:27017/gofoodMern?ssl=true&replicaSet=atlas-kuhi78-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true});
        console.log("Connected to MongoDB");

        // Fetch data after successful connection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_items = fetched_data;
        global.foodCat = foodCategory;
        // console.log(global.food_items)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;

