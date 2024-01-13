import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

export const AuthMiddleware = (props: any) =>  {
    const {token} = useContext(AuthContext)
    return token ? props.element : <Navigate to="/auth" />;
}

