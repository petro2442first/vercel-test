import logo from '@assets/images/logo@2x.png';
import { SignInForm } from '@components/sign-in-form/sign-in-form';
import callcentergif from '@assets/images/callcenter.gif';

import './login.scss';

export const LoginPage = () => {
    return (
        <div className="login-page">
            <aside className="login-page__sidebar">
                <h2 className="login-page__company">RocketCall</h2>
                <img className="login-page__logo" src={logo} alt="" />
                <h3>Login</h3>

                <SignInForm />
            </aside>
            <main className="login-page__graphic">
                <img src={callcentergif} alt="" />
            </main>
        </div>
    )
}