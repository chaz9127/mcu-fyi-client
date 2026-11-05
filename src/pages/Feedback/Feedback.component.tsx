import { useState } from 'react';
import '../../styles/forms.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';

export const Feedback = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Nav />
            <main className="form-page">
                <form
                    onClick={(e) => {e.stopPropagation()}}
                    action={`https://formsubmit.co/${import.meta.env.VITE_FORMSUBMIT_EMAIL_ID}`}
                    method="POST"
                    className="form-card"
                    onSubmit={() => {setLoading(true)}}
                >
                    <span className="eyebrow">Feedback</span>
                    <h1 className="form-title">Send us feedback.</h1>
                    <p className="form-intro">Spot something wrong or missing? Let us know.</p>
                    <div className="form-field">
                        <label htmlFor="feedback-email" className="form-label">Email <span className="form-hint">(optional)</span></label>
                        <input id="feedback-email" name="email" className="form-input" type="text" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="feedback-message" className="form-label">Message</label>
                        <textarea required id="feedback-message" name="feedback-message" className="form-input"/>
                    </div>
                    <div className="form-actions">
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
            </main>
        </>
    )
}
