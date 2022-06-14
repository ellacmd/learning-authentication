import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
    const newPasswordInputRef = useRef();
    const ctx = useContext(AuthContext);
    const navigate = useNavigate()

    const changePasswordHandler = (e) => {
        e.preventDefault();
        const newPassword = newPasswordInputRef.current.value;
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD8HLjtR98Tszz7Neig5WpKyjYP9Bq_kdY',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: ctx.token,
                    password: newPassword,
                    returnSecureToken:true
                }),
                headers: {
                    'content-type': 'application/json',
                },
            }
        ).then(response => console.log(response))
        navigate('/')
    }
    return (
        <form className={classes.form} onSubmit={changePasswordHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input
                    type='password'
                    id='new-password'
                    ref={newPasswordInputRef}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
