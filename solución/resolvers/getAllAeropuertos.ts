import { Modeloaeropuerto } from "../db/aeropuertos.ts";
import { Request, Response } from "npm:express@4.18.2"
import axios from "npm:axios"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load()
const api_key = env.api_key || Deno.env.get("api_key")



export default async function getallAeropuerto(req:Request,res: Response) {
    try {
        const existeaeropuerto = await Modeloaeropuerto.find()
        if (!existeaeropuerto) throw new Error("No hay aeropuertos")
            const arrayaeropuertos=[]
for (let index = 0; index < existeaeropuerto.length; index++) {
    const respuesta= await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${existeaeropuerto[index].ciudad}`,{ headers:{"X-Api-Key": api_key}})
    const calidad= respuesta.data.overall_aqi
    const respuesta2=await axios.get(`https://api.api-ninjas.com/v1/city?name=${existeaeropuerto[index].ciudad}`,{ headers:{"X-Api-Key": api_key}})
    const population= respuesta2.data[0].population
    arrayaeropuertos.push({
        nombre:existeaeropuerto[index].nombre,
        ciudad:existeaeropuerto[index].ciudad,
        pais:existeaeropuerto[index].pais,
        calidadAire: calidad,
        Poblacion:population,
        id:existeaeropuerto[index]._id
    })
}
        return res.status(200).send(arrayaeropuertos)

    } catch (error) {
return res.status(400).send(error.message)
    }
}