import { useState } from 'react';
import './Feedback.component.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';

export const Feedback = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Nav />
            <div className="feedback-page-container">
                <form
                    onClick={(e) => {e.stopPropagation()}}
                    action={`https://formsubmit.co/${import.meta.env.VITE_FORMSUBMIT_EMAIL_ID}`}
                    method="POST"
                    className="feedback-form"
                    onSubmit={() => {setLoading(true)}}
                >
                    <h1 className="feedback-page-title">Send us feedback.</h1>
                    <div className="feedback-form-input-container">
                        <label htmlFor="feedback-message" className="feedback-form-label">Email (optional)</label>
                        <input name="email" className="feedback-form-input" type="text" />
                    </div>
                    <div className="feedback-form-input-container">
                        <label htmlFor="feedback-message" className="feedback-form-label">Message</label>
                        <textarea required name="feedback-message" className="feedback-form-input"/>
                    </div>
                    <div className="feedback-form-input-container">
                        <Button
                            buttonType="submit"
                            text={loading ? 'Sending...': 'Send'}
                            textOnly={true}
                            disabled={loading}
                        />
                    </div>
                    <input type="hidden" name="_subject" value={`Message from TheMCU.FYI`} />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value={`${import.meta.env.VITE_CLIENT_URL}/?submittedFeedback=true`} />
                </form>
            </div>
        </>
    )
}