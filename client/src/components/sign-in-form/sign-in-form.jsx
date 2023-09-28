import { Formik } from 'formik';
import { useDispatch } from 'react-redux'

import { Button } from "../../elements/button/button"
import { Input } from "../../elements/input/input"
import { loginUser } from '../../store/actions/user.actions';

export const SignInForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        console.log('handleSubmit called');
        event.preventDefault();
        const { username, password } = event.target;

        console.log(username, password);


        dispatch(loginUser({ username: username.value, password: password.value }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Login" name="username" type="text" placeholder="Login" defaultValue="1011111111"/>
            <Input label="Password" name="password" type="password" placeholder="Password" defaultValue="ehF8km956PRf*G)!"/>

            <Button type="primari-pink">Log in</Button>
        </form>
    )
}