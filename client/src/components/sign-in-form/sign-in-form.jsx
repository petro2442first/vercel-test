import { Button } from "../../elements/button/button"
import { Input } from "../../elements/input/input"

export const SignInForm = () => {
    return (
        <form>
            <Input label="Login" type="text" placeholder="Login"/>
            <Input label="Password" type="password" placeholder="Password"/>

            <Button>Log in</Button>
        </form>
    )
}