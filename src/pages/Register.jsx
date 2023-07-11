import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clienteAxios } from '../config/axios';

export function Register() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");

    const [ alert, setAlert ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if( [ name, email, password, repeatPassword ].includes("") ) {
            setAlert({
                msg: "Hay campos vacios",
                error: true
            });

            return;
        }

        if( password.length < 6 ) {
            setAlert({
                msg: "El password es muy corto",
                error: true
            });

            return;
        }

        if( password != repeatPassword ) {
            setAlert({
                msg: "Los passwords no son iguales",
                error: true
            });

            return;
        }

        setAlert({});

        // Crear el usuario en la api
        try {
            await clienteAxios.post( `/veterinarios`, {
                name, email, password
            });
            setAlert({
                msg: "Creado correctamente, revisa tu email",
                error: false
            })

            setName("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");

            setTimeout(() => {
                setAlert({});
            }, 3000);

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alert;

    return(
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu Cuenta y Administra
                    <span className="text-black"> tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={ handleSubmit }>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Name
                        </label>
                        <input 
                            type="text"
                            placeholder="Your Name"
                            maxLength="30"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ name }
                            onChange={ e => setName( e.target.value ) } />
                    </div>

                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Your Email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ email }
                            onChange={ e => setEmail( e.target.value )} />
                    </div>

                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Your Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ password }
                            onChange={ e => setPassword( e.target.value )} />
                    </div>

                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Repeat Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Repeat your Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ repeatPassword }
                            onChange={ e => setRepeatPassword( e.target.value )} />
                    </div>

                    <input 
                        type="submit"
                        value="Create account"
                        className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase 
                        font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto
                        px-10" />

                    {
                        msg && <Alert alert={ alert } />
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
                        to="/forgort-password">
                            Forgort password
                    </Link>
                </nav>
            </div>
        </>
    );
}