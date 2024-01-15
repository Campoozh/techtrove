import axios  from "axios";
import {createContext, useContext, useState} from "react";
import { AuthContextProviderProps, AuthContextType, AuthProps } from "../types/Auth";
import {CartContext} from "./CartContext";

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [responseMessage, setResponseMessage] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const {resetCart} = useContext(CartContext)

    async function signIn(props: AuthProps) {

        const {email, password} = props;
        const data = { email, password }

        await axios.post('http://127.0.0.1:3333/sessions', data)
            .then(res => {

                const token = res.data.token;
                localStorage.setItem('token', token);
                setToken(token)

            })
            .catch(error => {

                if(error.response.status === 400)
                    setResponseMessage("Invalid credentials. Pleasy verify.")
                /* response feita de uma maneira diferente da "/register"? */

            });
    }

    async function signUp(props: AuthProps) {

        const { name, email, password } = props;
        const data = { name, email, password }

           await axios.post('http://localhost:3333/register', data)
           .then(res => {

               // const token = res.data.token;
               // localStorage.setItem('token', token);
               // setToken(token)
               console.log("Registered successfully");

            })
            .catch(error => {

                if(error.response.status === 400) setResponseMessage(error.response.data.details[0].message); // Apresenta os erros 1 por vez
                else setResponseMessage(error.response.data.message)

            });
    }

    async function signOut() {
        resetCart()
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ token, responseMessage, signIn, signUp, signOut }} >
            {children}
        </AuthContext.Provider>
    )

}
