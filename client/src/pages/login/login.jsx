import logo from '@assets/images/logo@2x.png';
import { SignInForm } from '../../components/sign-in-form/sign-in-form';
import callcentergif from '@assets/images/callcenter.gif';

import './login.scss';
import { ShowNotification } from '../../components/show-notification/show-notification';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const LoginPage = () => {
    const { isUserLogged } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLogged) {
            // navigate('/');
        }
    }, [isUserLogged]);

    return (
        <div className="login-page">
            <aside className="login-page__sidebar">
                <h2 className="login-page__company">RocketCall</h2>
                <img className="login-page__logo" src={logo} alt="" />
                <h3 className="login-page__header">Login</h3>

                <SignInForm />
            </aside>
            <main className="login-page__graphic">
                <img src={callcentergif} alt="" />
            </main>
            <ShowNotification />
        </div>
    )
}