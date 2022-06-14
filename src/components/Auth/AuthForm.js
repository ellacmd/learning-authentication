import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const ctx = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const authenticationHandler = async (url) => {
        const emailInput = emailRef.current.value;
        const passwordInput = passwordRef.current.value;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput,
                }),
            });
            const data = await response.json();
            ctx.login(data.idToken);
            navigate('/');
            if (!response.ok) {
                throw new Error(data.error.message);
            }
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (isLogin) {
            authenticationHandler(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8HLjtR98Tszz7Neig5WpKyjYP9Bq_kdY'
            );

           
        } else {
            authenticationHandler(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8HLjtR98Tszz7Neig5WpKyjYP9Bq_kdY'
            );
        }
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordRef}
                    />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}>
                        {isLogin
                            ? 'Create new account'
                            : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
