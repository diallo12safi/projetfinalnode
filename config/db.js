import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';


export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');
  } catch (err) {
    console.error('❌ Échec connexion MongoDB Atlas :', err.message);
    process.exit(1); // Arrête le processus en cas d'erreur de connexion
  }
}


//connectDB();