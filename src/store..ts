//store es basicamente lo mismo a un reducer-- en el store colocas tu state y tambien las funciones(acciones) que las modifican 
//Para comunicar el formulario con el store es con las acciones 
import {create} from 'zustand'
import { DraftPatient, Patient } from './types'

type PatientState={
    patients: Patient[]//los pacientes, son de tipo paciente y tiene que ser arreglo porque son multiples
    addPatient:(data:DraftPatient)=>void//commo estamos en otro archivo hay que especifiacrle que tipo de dato espera porque sino pierde la referencia
}

export const usePatientStore = create<PatientState>(()=>({//generic<>
    patients:[],
    addPatient:(data)=>{
        console.log(data)
    }
}))
