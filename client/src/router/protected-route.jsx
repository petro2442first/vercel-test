import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/slices/user.slice";

export const ProtectedRoute = () => {
    const { isUserLogged } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!isUserLogged) {
            dispatch(showNotification({
                type: 'error',
                title: 'Forbidden',
                description: 'You need to log in to view this page.',
            }))
            return navigate('/login');
        }
    }, [isUserLogged]);

    return <Outlet />;  
}