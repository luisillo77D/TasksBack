import mongoose from 'mongoose';
const url = 'mongodb+srv://luisillo77mario:UeQqgZ3ADP7qOKUr@cluster0.foe0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const connectdb = async () =>{
    try {
        await mongoose.connect(url);
        console.log("conexion exitosa")
    } catch (error) {
        console.log(error)
    }
}