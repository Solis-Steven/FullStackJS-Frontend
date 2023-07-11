import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { clienteAxios } from "../config/axios";

import { Alert } from '../components/Alert';

export function NuevoPassword() {
    const [ password, setPassword ] = useState("");
    const [ alert, setAlert ] = useState({});
    const [ tokenValido, setTokenValido ] = useState( false );
    const [ passwordModificado, setPasswordModificado ] = useState( false );
    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async() => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${ token }`);
                setAlert({
                    msg: "Coloca tu nuevo password",
                    error: false
                })
                setTokenValido( true );
            } catch (error) {
                setAlert({
                    msg: "Hubo un error con el enlace",
                    error: true
                })
            }
        }
        comprobarToken();

    }, []);

    const { msg } = alert;

    const handleSubmit = async e => {
        e.preventDefault()

        if( password.length < 6 ) {
            setAlert({
                msg: "El password debe ser minimo de 6 caracteres",
                error: true
            })
            return;
        }


        try {
            const url = `/veterinarios/olvide-password/${ token }`;
            const { data } = await clienteAxios.post(url, { password });

            setAlert({
                msg: data.msg,
                error: false
            })
            setPasswordModificado( true );
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return(
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Reestablace tu password y no Pieras Acceso a
                    <span className="text-black"> tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {
                    tokenValido && (
                        <>
                            <form onSubmit={ handleSubmit }>
                                <label 
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                    New Password
                                </label>
                                <input 
                                    type="password"
                                    placeholder="Your Password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={ password }
                                    onChange={ e => setPassword( e.target.value )} />

                                <input 
                                    type="submit"
                                    value="Save new password"
                                    className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase 
                                    font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto
                                    px-10" />
                            </form>

                            {
                                msg && <Alert alert={ alert } />
                            }

                            {
                                passwordModificado && 
                                <Link 
                                    className='block text-center my-5 text-gray-500'
                                    to="/">
                                    Login
                                </Link> 
                            } 
                        </>
                    )
                }
            </div>
        </>
    );
}