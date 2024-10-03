
//---1-----Este type es de los datos cuanando registramos un paciente
export type Patient = {
    id:string
    name:string
    caretaker:string
    email:string
    date:Date
    symptoms:string

}

//----2---- Pero cuando no tenemos un id es un draft o borrador 
//utilities type = omit
export type DraftPatient = Omit<Patient,'id'>
