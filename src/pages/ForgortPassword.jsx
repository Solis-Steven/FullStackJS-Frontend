import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clienteAxios } from '../config/axios';

export function ForgortPassword() {
    const [ email, setEmail ] = useState("");
    const [ alerta, setAlerta ] = useState({});
    
    const handleSubmit = async e => {
        e.preventDefault();

        if( email === "" || email.length < 6 ) {
            setAlerta({
                msg: "El email es obligatorio",
                error: true
            })
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', {
                email
            });

            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const { msg } = alerta;

    return(
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera tu Acceso y no Pierdas  
                    <span className="text-black"> tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={ handleSubmit }>
                    <div className="my-2 relative">
                        <input 
                            id='email'
                            type="email"
                            placeholder='Email address'
                            className="peer w-full focus:outline-none bg-white
                            border-2 focus:border-indigo-600 h-11 p-3
                            text-gray-900 border-gray-300
                            placeholder-transparent"
                            value={ email }
                            onChange={ e => setEmail(e.target.value) } />
                        <label 
                            className="absolute text-gray-600 block left-0 -top-3
                            peer-placeholder-shown:text-gray-400 ml-4
                            peer-placeholder-shown:top-2 transition-all bg-white
                            text-sm peer-placeholder-shown:text-lg"
                            htmlFor='email'>
                            Email address
                        </label>
                    </div>

                    <input 
                        type="submit"
                        value="Send instructions"
                        className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase 
                        font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto
                        px-10" />
                    
                    {
                        msg && <Alert alert={ alerta } />
                    }
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link 
                        className='block text-center my-5 text-gray-500'
                        to="/">
                            Already you have an account? Login
                    </Link>
                    
                    <Link 
                        className='block text-center my-5 text-gray-500'
                        to="/register">
                            Don't have an account? Sign up
                    </Link>
                </nav>
            </div>
        </>
    );
}