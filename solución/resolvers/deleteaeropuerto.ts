import { Modeloaeropuerto } from "../db/aeropuertos.ts";
import { Request, Response } from "npm:express@4.18.2"




export default async function deleteAeropuerto(req: Request, res: Response) {
    try {

        const id = req.query.id

        const existeaeropuerto = await Modeloaeropuerto.findByIdAndDelete(id)
        if (!existeaeropuerto) throw new Error("No existe aeropuerto con ese id")
        return res.status(200).send(existeaeropuerto)

    } catch (error) {
return res.status(400).send(error.message)
    }
}