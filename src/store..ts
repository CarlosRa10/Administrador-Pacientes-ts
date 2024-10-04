//store es basicamente lo mismo a un reducer-- en el store colocas tu state y tambien las funciones(acciones) que las modifican 
import {create} from 'zustand'
import { Patient } from './types'

type PatientState={
    patients: Patient[]//los pacientes, son de tipo paciente y tiene que ser arreglo porque son multiples
}

export const usePatientStore = create<PatientState>(()=>({//generic<>
    patients:[]
}))