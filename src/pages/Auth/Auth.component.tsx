import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.component.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';
import type { AppDispatch } from '../../features/store';
import { useLoginMutation, useRegisterMutation } from '../../features/authApiSlice';
import { setCredientals } from '../../features/authSlice';

type ErrorResponse = {
    originalStatus?: {
        message: string | null | undefined,
        status:  number | null | undefined
    }
}

export const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const [authState, setAuthState] = useState('register');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const isRegisterState = () => {
        return authState === 'register'; 
    };

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

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
                const userData = await register({email, password}).unwrap();
                if(userData) {
                    dispatch(setCredientals({ ...userData, email }));
                    localStorage.setItem('accessToken', userData.accessToken || null)
                    navigate('/');
                } else {
                    throw('Failed to create user')
                }
            } catch(err) {
                console.error('Failed to create user');
            }
        } else if (isFormValid() && !isRegisterState()) {
            try {
                const userData = await login({email, password}).unwrap()
                dispatch(setCredientals({ ...userData, email }));
                localStorage.setItem('accessToken', userData.accessToken || null)
                navigate('/');
            } catch (err) {
                const currentError = (err as ErrorResponse);
                if (!currentError.originalStatus) {
                    setErrorMessage('No Server Response')
                } else if (currentError?.originalStatus?.status === 400) {
                    setErrorMessage('Missing Email or Password');
                } else if (currentError?.originalStatus?.status === 401) {
                    setErrorMessage('Unauthorized');
                } else {
                    setErrorMessage('Login Failed');
                }
            }
        }
    }
    return (
        <>
            <Nav />
            {errorMessage && (
                <div>
                    {errorMessage}
                </div>
            )}
            <div className="auth-page-container">
                <form onClick={(e) => {e.stopPropagation()}} className="auth-form">
                    <div className="auth-select-buttons">
                        <Button
                            buttonType={'button'}
                            callback={() => {setAuthState('register')}}
                            text="Register"
                            secondary={authState !== 'register'}
                        />
                        <Button
                            buttonType={'button'}
                            callback={() => {setAuthState('log in')}}
                            text="Log In"
                            secondary={authState !== 'log in'}
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