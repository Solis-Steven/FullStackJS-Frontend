import { Outlet, Navigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export function RutaProtegia() {
    const { auth, cargando } = useAuth();

    return(
        <>
            <Header />
            {
                auth?._id 
                    ? (
                        <main className="container mx-auto mt-10">
                            <Outlet />
                        </main>
                    )
                    : <Navigate to="/" />
            }
            <Footer />
        </>
    );
}