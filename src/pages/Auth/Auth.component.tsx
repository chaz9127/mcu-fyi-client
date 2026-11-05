import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/forms.scss'
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
    const [loading, setLoading] = useState<boolean>(false);
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

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
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
        setLoading(false)
    }

    const displayErrors = () => {
        if (!errorMessage.length) return [];
        
        return (
            <div className="form-errors">
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
            <main className="form-page">
                <form onSubmit={(e) => {submitForm(e);}} className="form-card">
                    <Tabs label="Register or login" tabs={getTabs()}/>
                    <h1 className="form-title">{isRegisterState() ? 'Create your account' : 'Welcome back'}</h1>
                    <p className="form-intro">Keep track of everything you've watched across the MCU.</p>
                    {displayErrors()}
                    <div className="form-field">
                        <label htmlFor="auth-email" className="form-label">Email</label>
                        <input required ref={emailRef} id="auth-email" name="email" className="form-input" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="auth-password" className="form-label">Password {isRegisterState() && <span className="form-hint">(at least 8 characters)</span>}</label>
                        <input required ref={passwordRef} id="auth-password" name="password" minLength={8} className="form-input" type="password"  onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                   {isRegisterState() && <div className="form-field">
                        <label htmlFor="auth-confirm-password" className="form-label">Confirm Password</label>
                        <input required ref={confirmPasswordRef} id="auth-confirm-password" name="confirm-password" className="form-input" type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
                    </div>}
                    <div className="form-actions">
                        <Button
                            buttonType="submit"
                            text={loading ? 'Submitting...' : (isRegisterState() ? 'Create account' : 'Login')}
                            textOnly={true}
                            disabled={!isFormValid() || loading}
                        />
                    </div>
                    <input type="hidden" name="_captcha" value="false" />
                </form>
            </main>
        </>
    )
}
