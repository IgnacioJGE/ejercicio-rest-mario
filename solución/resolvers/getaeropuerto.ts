import { Modeloaeropuerto } from "../db/aeropuertos.ts";
import { Request, Response } from "npm:express@4.18.2"
import axios from "npm:axios"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load()
const api_key = env.api_key || Deno.env.get("api_key")



export default async function getAeropuerto(req: Request, res: Response) {
    try {

        const id = req.query.id

        const existeaeropuerto = await Modeloaeropuerto.findById(id)
        if (!existeaeropuerto) throw new Error("No existe aeropuerto con ese id")
            const respuesta= await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${existeaeropuerto.ciudad}`,{ headers:{"X-Api-Key": api_key}})
        const calidad= respuesta.data.overall_aqi
        const respuesta2=await axios.get(`https://api.api-ninjas.com/v1/city?name=${existeaeropuerto.ciudad}`,{ headers:{"X-Api-Key": api_key}})
        const population= respuesta2.data[0].population
        return res.status(200).send({
            nombre:existeaeropuerto.nombre,
            ciudad:existeaeropuerto.ciudad,
            pais:existeaeropuerto.pais,
            calidadAire: calidad,
            Poblacion:population,
            id:existeaeropuerto._id

        })

    } catch (error) {
return res.status(400).send(error.message)
    }
}