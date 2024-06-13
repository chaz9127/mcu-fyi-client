import './Feedback.component.scss'
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';

export const Feedback = () => {
    console.log(`${import.meta.env.VITE_CLIENT_URL}/?submittedFeedback=true`)
    return (
        <>
            <Nav />
            <div className="feedback-page-container">
                <form
                    onClick={(e) => {e.stopPropagation()}}
                    action="https://formsubmit.co/themcufyi@gmail.com" 
                    method="POST"
                    className="feedback-form"
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
                            text="Send"
                            textOnly={true}
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