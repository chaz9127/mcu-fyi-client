import { useState } from 'react';
import { Button } from '../Button/Button.component';
import './FeedbackModal.style.scss';

type FeedbackModalProps = {
  isOpen: boolean,
  closeCallback: () => void,
} 

export const FeedbackModal = (props: FeedbackModalProps) => {
  const {isOpen, closeCallback} = props;
  const [feedbackType, updateFeedbackType] = useState('bug');

  const isSelected = (id: string) => {
    return id.toLowerCase() === feedbackType.toLowerCase();
  }
  const getButtonClass = (type: string) => {
    const isSelectedClass = isSelected(type) ? 'feedback-button-selected' : '';
    return `feedback-button ${isSelectedClass}`;
  }
  return isOpen && (
    <div className="feedback-container" onClick={closeCallback}>
      {/* move action to onSubmit() and develop a feedback backend */}
      <form onClick={(e) => {e.stopPropagation()}} className="feedback-form" action="https://formsubmit.co/chasanid@gmail.com" method="POST">
        <h2>Send us feedback</h2>
        <div className="feedback-input-container">
          <div className="feedback-input">
            <label htmlFor="email">Email (optional):</label>
            <i className="fa-regular fa-envelope"></i><input type="email" name="email" />
          </div>
          <div className="feedback-input">  
            <label htmlFor="feedback-message">Message*:</label>
            <textarea required name="feedback-message"></textarea>
          </div>
        </div>
        <div className="feedback-button-container">
          <div onClick={() => updateFeedbackType('bug')} className={getButtonClass('bug')}>
            <i className='fa fa-bug'></i>
            <br />
            Bug
          </div>
          <div onClick={() => updateFeedbackType('idea')} className={getButtonClass('idea')}>
            <i className="fa-regular fa-lightbulb"></i>
            <br />
            Idea
          </div>
          <div onClick={() => updateFeedbackType('other')} className={getButtonClass('other')}>
            <i className="fa-regular fa-circle-question"></i>
            <br />
            Other
          </div>
        </div>
        <div className="feedback-submit">
          <Button
            buttonType="submit"
            text="Send"
            textOnly={true}
          />
        </div>
        <div className='feedback-close-button'>
          <i onClick={closeCallback} className="fa-solid fa-xmark"></i>
        </div>
        <input type="hidden" name="_subject" value={`[${feedbackType}]: Message from TheMCU.FYI`} />
        <input type="hidden" name="_captcha" value="false" />
      </form>
    </div>
  )
}