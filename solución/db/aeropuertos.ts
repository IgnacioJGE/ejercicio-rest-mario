import mongoose from "npm:mongoose@7.6.3"
import { aeropuerto } from "../types.ts"

const Schema= mongoose.Schema;


const schemaAeropuerto= new Schema({
    nombre:{type:String,required:true},
    ciudad:{type:String,required:true},
    pais:{type:String,required:true}

},
{timestamps:true})

export type tioaeropuerto= mongoose.Document & (aeropuerto)

schemaAeropuerto.path("nombre").validate(async function (nombre:string) {
        try {
            const aero= await mongoose.models.Aeropuertos.findOne({nombre:nombre})
            if(aero) throw new Error("Eropuerto ya existente")

            return true
        } catch (error) {
            return false
        }
})

export const  Modeloaeropuerto= mongoose.model<tioaeropuerto>("Aeropuertos",schemaAeropuerto)