import { useState, useEffect } from "react";
import { usePacientes } from "../hooks/usePacientes";
import { Alert } from "./Alert";

export function Formulario() {
    const [ nombre, setNombre ] = useState("");
    const [ propietario, setPropietario ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ fecha, setFecha ] = useState("");
    const [ sintomas, setSintomas ] = useState("");
    const [ id, setId ] = useState( null );

    const [ alert, setAlert ] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if( paciente?.nombre ) {
            setNombre( paciente.nombre );
            setPropietario( paciente.propietario );
            setEmail( paciente.email );
            setFecha( paciente.fecha );
            setSintomas( paciente.sintomas );
            setId( paciente._id );
        }
    }, [ paciente ]);

    const handleSubmit = e => {
        e.preventDefault();

        // Validar formulario
        if([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });

            return;
        }

        guardarPaciente({
            nombre,
            propietario, 
            email,
            fecha, 
            sintomas,
            id
        });
        setAlert({
            msg: "Guardado Correctamente",
            error: false
        });

        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setSintomas("");
        setId("");
    }

    const { msg } = alert;

    return(
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus Pacientes y
                <span className="text-indigo-600 font-bold"> Administralos</span>
            </p>

            <form
                onSubmit={ handleSubmit } 
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md">
                <div className="mb-5">
                    <label 
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-3 mt-2 placeholder-gray400
                        rounded-md"
                        value={ nombre }
                        onChange={  e => setNombre( e.target.value )}  />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input 
                        type="text"
                        id="propietario"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-3 mt-2 placeholder-gray400
                        rounded-md"
                        value={ propietario }
                        onChange={  e => setPropietario( e.target.value )}  />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold">
                        Email Propietario
                    </label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email del propietario"
                        className="border-2 w-full p-3 mt-2 placeholder-gray400
                        rounded-md"
                        value={ email }
                        onChange={  e => setEmail( e.target.value )}  />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input 
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-3 mt-2 placeholder-gray400
                        rounded-md"
                        value={ fecha }
                        onChange={  e => setFecha( e.target.value )}  />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea 
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-3 mt-2 placeholder-gray400
                        rounded-md"
                        value={ sintomas }
                        onChange={  e => setSintomas( e.target.value )}  />
                </div>

                <input 
                    type="submit"
                    value={ id ? "Editar paciente" : "Agregar Paciente"}
                    className="bg-indigo-600 w-full p-3 text-white uppercase
                    font-bold hover:bg-indigo-700 cursor-pointer transition-colors" />
            </form>

            {
                msg && <Alert alert={ alert }/>
            }
        </>
    );
}