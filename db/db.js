const mongoose = require('mongoose')

const db = async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to db ☺")
    } catch (error) {
        console.log('DB connexion failed :(')
    }

}
module.exports ={db}