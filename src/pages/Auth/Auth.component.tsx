import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import './Auth.component.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';
import { User } from '../../types';
// import { SERVER_URL } from '../../constants/server';
import type { AppDispatch } from '../../features/store';

export const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch.withTypes<AppDispatch>()();
    // const userStatus = useSelector(getAddUserStatus)
    // const userError = useSelector(getAddUserError)
    const [authState, setAuthState] = useState('register');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isRegisterState = () => {
        return authState === 'register'; 
    }

    const isFormValid = () => {
        if (isRegisterState()) {
            return email && password && password.length > 7 && password === confirmPassword
        } else {
            return email && password
        }
    }

    const submitForm = async () => {
        if (isFormValid() && isRegisterState()) {
            try {
                const data = await dispatch(
                    postUser(({email, password}) as User)
                ).unwrap()
                if(data) {
                    navigate('/');
                } else {
                    throw('Failed to create user')
                }
            } catch(err) {
                console.error('Failed to create user');
            }
        }
    }
    return (
        <>
            <Nav />
            <div className="auth-page-container">
                <form onClick={(e) => {e.stopPropagation()}} className="auth-form">
                    <div className="auth-select-buttons">
                        <Button
                            buttonType={'button'}
                            callback={() => {setAuthState('log in')}}
                            text="Log In"
                            secondary={authState !== 'log in'}
                        />
                        <Button
                            buttonType={'button'}
                            callback={() => {setAuthState('register')}}
                            text="Register"
                            secondary={authState !== 'register'}
                        />
                    </div>
                    <div className="auth-form-input-container">
                        <label htmlFor="auth-message" className="auth-form-label">Email</label>
                        <input required name="email" className="auth-form-input" type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="auth-form-input-container">
                        <label htmlFor="auth-password" className="auth-form-label">Password {isRegisterState() && "(at least 8 characters)"}</label>
                        <input required name="password" className="auth-form-input" type="password"  onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                   {isRegisterState() && <div className="auth-form-input-container">
                        <label htmlFor="auth-confirm-password" className="auth-form-label">Confirm Password</label>
                        <input required name="confirm-password" className="auth-form-input" type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
                    </div>}
                    <div className="auth-form-input-container">
                        <Button
                            buttonType="button"
                            text="Submit"
                            textOnly={true}
                            disabled={!isFormValid()}
                            callback={submitForm}
                        />
                    </div>
                    <input type="hidden" name="_captcha" value="false" />
                </form>
            </div>
        </>
    )
}