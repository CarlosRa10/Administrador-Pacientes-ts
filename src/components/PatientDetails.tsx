import { Patient } from "../types"
import PatientDetailsItem from "./PatientDetailsItem"

type PatientDetailsProps = {
    patient:Patient
}
export default function PatientDetails({patient}:PatientDetailsProps) {
  return (
    <div className=" mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetailsItem label="ID" data={patient.id}/>
        <PatientDetailsItem label="Nombre" data={patient.name}/>
        <PatientDetailsItem label="Propietario" data={patient.caretaker}/>
        <PatientDetailsItem label="Email" data={patient.email}/>
        <PatientDetailsItem label="Fecha Alta" data={patient.date.toString()}/>
        <PatientDetailsItem label="Síntomas" data={patient.symptoms}/>
    </div>
  )
}
