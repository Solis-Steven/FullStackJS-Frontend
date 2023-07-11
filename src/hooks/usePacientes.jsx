import { useContext } from "react";
import { PacientesContext } from "../context/PacientesProvider";

export function usePacientes() {
    

    return( useContext( PacientesContext ) );
}