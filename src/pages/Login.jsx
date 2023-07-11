import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clienteAxios } from '../config/axios';
import { useAuth } from '../hooks/useAuth';

export function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ alert, setAlert ] = useState({});
    const navigate = useNavigate();

    const { setAuth } = useAuth();
    
    const handleSubmit = async e => {
        e.preventDefault();

        if( [ email, password ].includes("") ) {
            setAlert({
                msg: "Todos los campos son oblgigatorios",
                error: true
            });

            return;
        }

        try {
            const { data } = await clienteAxios.post("/veterinarios/login", {
                email,
                password
            })

            localStorage.setItem("token", data.token);
            setAuth( data );
            navigate("/admin")
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert;

    return(
        <>
            
            <div className="">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesion y Administra tus  
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={ handleSubmit }>
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
                            onChange={ e => setEmail( e.target.value ) } />
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
                            onChange={ e => setPassword( e.target.value ) } />
                    </div>

                    <input 
                        type="submit"
                        value="Login"
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
                        to="/register">
                            Don't have an account? Sign up
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