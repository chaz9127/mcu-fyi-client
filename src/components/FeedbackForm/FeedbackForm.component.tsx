import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/forms.scss';
import './FeedbackForm.component.scss';
import { Button } from '../Button/Button.component';
import { useSubmitFeedbackMutation } from '../../features/feedbackApiSlice';

type FeedbackError = {
    data?: { message?: string },
}

export const FeedbackForm = () => {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || !feedback.trim()) return;

        setErrorMessage('');
        setSent(false);
        try {
            await submitFeedback({ email: email.trim(), feedback: feedback.trim() }).unwrap();
            setEmail('');
            setFeedback('');
            setSent(true);
            toast('Feedback received');
        } catch (err) {
            setErrorMessage((err as FeedbackError).data?.message || 'Could not send your feedback. Please try again.');
        }
    }

    return (
        <form className="feedback-form" onSubmit={submitForm} noValidate>
            <p className="feedback-form-intro">Spot something wrong or missing? Let us know.</p>
            <div className="form-field">
                <label htmlFor="feedback-email" className="form-label">Email <span className="form-hint">(optional)</span></label>
                <input
                    id="feedback-email"
                    name="email"
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="feedback-message" className="form-label">Message</label>
                <textarea
                    id="feedback-message"
                    name="feedback"
                    className="form-input"
                    value={feedback}
                    maxLength={2000}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                />
            </div>
            {errorMessage && <p className="form-errors" role="alert">{errorMessage}</p>}
            {sent && <p className="feedback-form-sent" role="status">Thanks for the feedback!</p>}
            <div className="form-actions">
                <Button
                    buttonType="submit"
                    text={isLoading ? 'Sending...' : 'Send'}
                    textOnly={true}
                    disabled={isLoading || !feedback.trim()}
                />
            </div>
        </form>
    )
}
