//store es basicamente lo mismo a un reducer-- en el store colocas tu state y tambien las funciones(acciones) que las modifican 
//Para comunicar el formulario con el store es con las acciones 
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {v4 as uuidv4} from 'uuid'
import { DraftPatient, Patient } from './types'//Importamos las interfaces DraftPatient y Patient definidas en el archivo types.

//para que todo este sincronizado lo tengo que poner en PatientState -- states y funciones
type PatientState={
    patients: Patient[]//los pacientes, son de tipo paciente y tiene que ser arreglo porque son multiples
    activeId: Patient['id']
    addPatient:(data:DraftPatient)=>void//commo estamos en otro archivo hay que especifiacrle que tipo de dato espera porque sino pierde la referencia
    deletePatient:(id:Patient['id'])=>void
    getPatientById:(id:Patient['id'])=>void
}

const createPatient = (patient:DraftPatient):Patient=>{//Esta función toma un objeto DraftPatient (un paciente sin ID) y crea un nuevo objeto Patient agregándole un ID único generado por uuidv4.
    return {...patient,id:uuidv4()}
}

//Esto es nuestro inicio o estado 
export const usePatientStore = create<PatientState>()(
    devtools((set)=>({//generic<>-- Creamos un store de Zustand con el tipo PatientState.--La función set se utiliza para actualizar el estado del store.
        patients:[],
        activeId:'',
        addPatient:(data)=>{
            //console.log(data)
            const newPatient = createPatient(data)
            //set en Zustand es una herramienta fundamental para actualizar el estado de tu aplicación
            set((state)=>({//Cuando llamas a set, le pasas un nuevo objeto que representa el estado que deseas que tenga tu aplicación.
                patients:[...state.patients,newPatient]
            }))
        },
        deletePatient:(id)=>{
            //console.log(id)
            set((state)=>({//set no reemplaza completamente el estado existente, sino que lo fusiona con el nuevo estado que le proporcionas. Esto significa que las propiedades que no se incluyen en el nuevo objeto se mantendrán sin cambios.
                patients: state.patients.filter(patient=>patient.id !== id)
            }))
        },
        getPatientById:(id)=>{
            //console.log(id)
            set(()=>({//no necesitamos un valor previo 'state'-- porque vamos a escribir
                activeId: id
            }))
        }
    })
))
