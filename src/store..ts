//store es basicamente lo mismo a un reducer-- en el store colocas tu state y tambien las funciones(acciones) que las modifican 
//Para comunicar el formulario con el store es con las acciones 
import {create} from 'zustand'
import {v4 as uuidv4} from 'uuid'
import { DraftPatient, Patient } from './types'//Importamos las interfaces DraftPatient y Patient definidas en el archivo types.

type PatientState={
    patients: Patient[]//los pacientes, son de tipo paciente y tiene que ser arreglo porque son multiples
    addPatient:(data:DraftPatient)=>void//commo estamos en otro archivo hay que especifiacrle que tipo de dato espera porque sino pierde la referencia
}

const createPatient = (patient:DraftPatient):Patient=>{//Esta función toma un objeto DraftPatient (un paciente sin ID) y crea un nuevo objeto Patient agregándole un ID único generado por uuidv4.
    return {...patient,id:uuidv4()}
}

//Esto es nuestro inicio o estado 
export const usePatientStore = create<PatientState>((set)=>({//generic<>-- Creamos un store de Zustand con el tipo PatientState.--La función set se utiliza para actualizar el estado del store.
    patients:[],
    addPatient:(data)=>{
        //console.log(data)
        const newPatient = createPatient(data)
        set((state)=>({
            patients:[...state.patients,newPatient]
        }))
    }
}))
