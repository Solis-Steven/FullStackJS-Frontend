import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { clienteAxios } from '../config/axios';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [ cargando, setCargando ] = useState( true );
    const [ auth, setAuth ] = useState({}); 
    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem( "token" );

            if( !token ) {
                setCargando( false );
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            try {
                const { data } = await clienteAxios("/veterinarios/perfil", config);
                setAuth( data );
                navigate("/admin")
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando( false );
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setAuth({});
    }

    // Dentro del value se pone lo que va a devolve el useAuth
    return(
        <AuthContext.Provider 
            value={{ auth, setAuth, cargando, cerrarSesion }}>
            { children }
        </AuthContext.Provider>
    );
}

export {
    AuthProvider
}