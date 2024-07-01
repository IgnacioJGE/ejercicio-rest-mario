import { Modeloaeropuerto } from "../db/aeropuertos.ts";
import {Request,Response} from "npm:express@4.18.2"
import axios from "npm:axios"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env= await load()
const api_key=env.api_key||Deno.env.get("api_key")

export default async function addAeropuerto(req:Request,res:Response) {
try {
    const nombre= req.query.nombre
if(!nombre) throw new Error("Nombre del aeropuerto obligatorio")
    const respuesta= await axios.get(`https://api.api-ninjas.com/v1/airports?name=${nombre}`,{ headers:{"X-Api-Key": api_key}}
    )
    if(respuesta.data.length==0){
        throw new Error("Nombre del aeropuerto incorrecto")
    }
    const nombrecomp= respuesta.data[0].name
    const city=respuesta.data[0].city
    const pais= respuesta.data[0].region
    const nuevoaeropuerto = new  Modeloaeropuerto({
        nombre:nombrecomp,
        ciudad:city,
        pais:pais
    })
await nuevoaeropuerto.save()

return res.status(200).send(nuevoaeropuerto)
} catch (error) {
    return res.status(400).send(error.message)
}

}