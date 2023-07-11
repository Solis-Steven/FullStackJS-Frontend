import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import { AuthLayout } from './layout/AuthLayout';
import { RutaProtegia } from './layout/RutaProtegia';
import { 
        Login, 
        ConfirmAccount, 
        ForgortPassword, 
        Register, 
        NuevoPassword 
} from './pages';
import { AdministrarPacientes } from './pages/AdministrarPacientes';
import { CambiarPassword } from './pages/CambiarPassword';
import { EditarPerfil } from './pages/EditarPerfil';

function App() {

  

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={ <AuthLayout /> }>
              <Route index element={ <Login /> } /> {/** El index indica que es la pagina principal */}
              <Route path='register' element={ <Register /> } />
              <Route path='forgort-password' element={ <ForgortPassword /> } />
              <Route path='forgort-password/:token' element={ <NuevoPassword /> } />
              <Route path='confirm/:id' element={ <ConfirmAccount /> } />
            </Route>

            {/* Rutas privadas */}
            <Route path="/admin" element={ <RutaProtegia /> }>
              <Route index element={ <AdministrarPacientes /> } />
              <Route path="perfil" element={ <EditarPerfil /> } />
              <Route path="cambiar-password" element={ <CambiarPassword /> } />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
