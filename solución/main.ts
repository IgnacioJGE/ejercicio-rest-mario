import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import addAeropuerto from "./resolvers/addAeropuerto.ts";
import getAeropuerto from "./resolvers/getaeropuerto.ts";
import getallAeropuerto from "./resolvers/getAllAeropuertos.ts";
import deleteAeropuerto from "./resolvers/deleteaeropuerto.ts";


const env=await load()
const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL")
const PORT=env.PORT||Deno.env.get("PORT")||8000

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);

}

try {
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Concectado")
  const app= express();
  app.use(express.json())
  app.post("/addAeropuerto",addAeropuerto)
  app.get("/getAeropuerto", getAeropuerto)
  app.get("/getAllAeropuertos",getallAeropuerto)
  app.delete("/deleteAeropuerto",deleteAeropuerto)
  app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));

} catch (error) {
  console.error(error)

}