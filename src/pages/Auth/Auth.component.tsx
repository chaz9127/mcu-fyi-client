import { useState } from 'react';
import './Auth.component.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';

export const Auth = () => {
    const [authState, setAuthState] = useState('register')
    return (
        <>
            <Nav />
            <div className="auth-page-container">
                <form onClick={(e) => {e.stopPropagation()}} action="https://formsubmit.co/chasanid@gmail.com" method="POST" className="auth-form">
                    <h1 className="auth-page-title">Send us feedback.</h1>
                    <div className="auth-select-buttons">
                        <Button
                            url={``}
                            text="Log In"
                            secondary={authState !== 'log in'}
                        />
                        <Button
                            url={``}
                            text="Register"
                            secondary={authState !== 'register'}
                        />
                    </div>
                    <div className="auth-form-input-container">
                        <label htmlFor="auth-message" className="auth-form-label">Email (optional)</label>
                        <input name="email" className="auth-form-input" type="text" />
                    </div>
                    <div className="auth-form-input-container">
                        <label htmlFor="auth-message" className="auth-form-label">Message</label>
                        <textarea required name="auth-message" className="auth-form-input"/>
                    </div>
                    <div className="auth-form-input-container">
                        <Button
                            buttonType="submit"
                            text="Send"
                            textOnly={true}
                        />
                    </div>
                    <input type="hidden" name="_subject" value={`Message from TheMCU.FYI`} />
                    <input type="hidden" name="_captcha" value="false" />
                </form>
            </div>
        </>
    )
}