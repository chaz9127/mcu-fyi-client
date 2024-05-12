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
    message: string | null | undefined,
    status:  number | null | undefined,
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
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        if (emailRef?.current)          emailRef.current.value = '';
        if (passwordRef.current)        passwordRef.current.value = '';
        if(confirmPasswordRef.current)  confirmPasswordRef.current.value = '';
    }, [activeTab])
    useEffect(() => {
        const errors = [];
        if (isRegisterState()) {
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
        }
        
        setErrorMessage(errors);
    }, [email, password, confirmPassword]);

    const isFormValid = () => {
        if (isRegisterState()) {
            return email && password && password.length > 7 && password === confirmPassword
        } else {
            return email && errorMessage.length === 0 && password
        }
    }

    const submitForm = async (e: React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        if (isFormValid() && isRegisterState()) {
            try {
                const userData = await register({email, password}).unwrap();
                if(userData) {
                    dispatch(setCredientals({ ...userData, email }));
                    navigate('/', {state: {successfulRegister: true}});
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
                navigate('/', {state: {successfulLogin: true}});
            } catch (err) {
                const currentError = (err as ErrorResponseType);
                
                if (!currentError.status) {
                    setErrorMessage(['No Server Response'])
                } else if (currentError?.status === 400) {
                    setErrorMessage(['Missing Email or Password']);
                } else if (currentError?.status === 401) {
                    setErrorMessage(['Incorrect Email or Password']);
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
                    {errorMessage.map((error, idx) => {
                        return <li key={idx}>{error}</li>
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
    };

    return (
        <>
            <Nav />
            <div className="auth-page-container">
                <form onSubmit={(e) => {submitForm(e);}} className="auth-form">
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
                            buttonType="submit"
                            text="Submit"
                            textOnly={true}
                            disabled={!isFormValid()}
                        />
                    </div>
                    <input type="hidden" name="_captcha" value="false" />
                </form>
            </div>
        </>
    )
}