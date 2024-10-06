import { useForm } from 'react-hook-form'
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store.' 


//Zustand es un estado global pero de forma simple - es una dependencia -  
//Es una dependencia para manejar un estado global en tus aplicaciones de React - puede ser utilizado sin react
//su api es sencilla y se pude utilizar con js y ts
//Es una de las principales alternativas a Redux toolkit






export default function PatientForm() {
    //opcion 1 para comunicar
    //const {addPatient}= usePatientStore()
    //opcion 2 para comunicar
    const addPatient= usePatientStore(state=>state.addPatient)//llamada a las acciones
    //const activeId= usePatientStore(state=>state.activeId)
    //funcion register-te permite registrar 
    const { register, handleSubmit, formState:{errors},reset } = useForm<DraftPatient>()
    //console.log(errors)

    const registerPatient=(data:DraftPatient)=>{
        //console.log(data)
        addPatient(data)//comunicando los datos del formulario al store
        reset()
    }

    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}//Un evento(onSubmit), una funcion y otra funcion que se encarga de manejar toda la lógica o de recupera valores
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        //quiero que el formulario lo procese react hook form, para eso hacemos lo siguiente-lo que hace este codigo es decir que el campo es obligatorio
                        {...register('name',{
                            required:'El Nombre del paciente es obligatorio',
                            validate: value => value.trim() !== '' || 'El campo no puede contener solo espacios vacíos',
                            maxLength:{
                                value:10,
                                message:'Máximo 10 Caracteres'
                            }
                        })}
                    //{errors.name && (<Error>{errors.name.message as string}</Error>)}
                    />
                    {errors.name &&(
                        <Error>{errors.name?.message?.toString()}</Error>
                    )}
                    {/* {errors.maxLength &&(
                        <Error>{errors.name?.message?.toString()}</Error>//de hecho este codigo no hace falta, el de arriba( {errors.name &&) ya engloba todos los errores
                    )} */}
                    
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Propietario"
                      {...register('caretaker',{
                        required:'El Propietario del paciente es obligatorio',
                        validate: value => value.trim() !== '' || 'El campo no puede contener solo espacios vacíos'
                        }
                    )} 
                  />
                  {errors.caretaker &&(
                        <Error>{errors.caretaker?.message?.toString()}</Error>
                    )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email No Válido'
                        }
                      })} 
                />
                {errors.email &&(
                        <Error>{errors.email?.message?.toString()}</Error>
                    )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date',{
                        required:'La fecha de Alta es obligatoria'
                        }
                    )} 
                  />
                  {errors.date &&(
                        <Error>{errors.date?.message?.toString()}</Error>
                    )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente"
                      {...register('symptoms',{
                        required:'Los síntomas son obligatorios',
                        validate: value => value.trim() !== '' || 'El campo no puede contener solo espacios vacíos'
                        }
                    )} 
                    />
                    {errors.symptoms &&(
                        <Error>{errors.symptoms?.message?.toString()}</Error>
                    )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }