import mongoose from "mongoose";

(async () => {
  let dbUrl;

  if (process.env.NODE_ENV === "production") {
    // Configuración de base de datos para entorno de producción
    dbUrl = process.env.MONGODB_URI_PROD;
  } else {
    // Configuración de base de datos para otros entornos (desarrollo, prueba, etc.)
    dbUrl = process.env.MONGODB_URI_DEV;
  }

  const db = await mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Database is connected to:", db.connection.name);
})();