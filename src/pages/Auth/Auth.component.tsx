import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.component.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';
import type { AppDispatch } from '../../features/store';
import { useLoginMutation, useRegisterMutation } from '../../features/authApiSlice';
import { setCredientals } from '../../features/authSlice';
import { Tabs } from '../../components/Tabs/Tabs.component';

type ErrorResponseType = {
    originalStatus?: {
        message: string | null | undefined,
        status:  number | null | undefined
    }
}

export const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const emailRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [activeTab, setActiveTab] = useState('register');
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const isRegisterState = () => {
        return activeTab === 'register'; 
    };

    useEffect(() => {
        const errors = [];
        if (emailRef?.current?.value && emailRef?.current?.validationMessage) {
            const truncatedMessage = emailRef?.current?.validationMessage.split('.')[0]
            errors.push(truncatedMessage);
        }
        if (confirmPassword && password !== confirmPassword) {
            errors.push('Passwords must match');
        }
        if (passwordRef?.current?.value && passwordRef?.current?.validationMessage) {
            errors.push(passwordRef?.current?.validationMessage);
        }
        console.log('errors', errors)
        setErrorMessage(errors);
    }, [email, password, confirmPassword]);

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
                const currentError = (err as ErrorResponseType);
                if (!currentError.originalStatus) {
                    setErrorMessage(['No Server Response'])
                } else if (currentError?.originalStatus?.status === 400) {
                    setErrorMessage(['Missing Email or Password']);
                } else if (currentError?.originalStatus?.status === 401) {
                    setErrorMessage(['Unauthorized']);
                } else {
                    setErrorMessage(['Login Failed']);
                }
            }
        }
    }

    const displayErrors = () => {
        if (!errorMessage.length) return [];
        
        return (
            <div className="error-container">
                <ul>
                    {errorMessage.map(error => {
                        return <li>{error}</li>
                    })}
                </ul>
            </div>
        )
    }

    const getTabs = () => {
        return ['Register', 'Login'].map(tab =>{
            const tabValue = tab.toLowerCase();
            return {
                title: tab,
                value: tabValue,
                active: activeTab === tabValue,
                setTab: () => {
                    setActiveTab(tabValue);
                }
            }
        })
    }
    return (
        <>
            <Nav />
            <div className="auth-page-container">
                <form onClick={(e) => {e.stopPropagation()}} className="auth-form">
                    {displayErrors()}
                    <Tabs tabs={getTabs()}/>
                    <div className="auth-form-input-container">
                        <label htmlFor="auth-message" className="auth-form-label">Email</label>
                        <input required ref={emailRef} name="email" className="auth-form-input" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="auth-form-input-container">
                        <label htmlFor="auth-password" className="auth-form-label">Password {isRegisterState() && "(at least 8 characters)"}</label>
                        <input required ref={passwordRef} name="password" minLength={8} className="auth-form-input" type="password"  onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                   {isRegisterState() && <div className="auth-form-input-container">
                        <label htmlFor="auth-confirm-password" className="auth-form-label">Confirm Password</label>
                        <input required ref={confirmPasswordRef} name="confirm-password" className="auth-form-input" type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
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