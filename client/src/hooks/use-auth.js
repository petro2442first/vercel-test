import { useSelector } from "react-redux"

export const useAuth = () => {
    const isUserLogged = useSelector(state => state.userReducer.user.isLogged);
    return {
        isUserLogged
    }
}