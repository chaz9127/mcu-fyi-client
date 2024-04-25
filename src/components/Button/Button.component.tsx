import './Button.component.scss';
type ButtonProps = {
  text: string,
  url?: string,
  callback?: (e: React.MouseEvent) => void,
  textOnly?: boolean,
  buttonType?: "button" | "submit" | "reset" | undefined,
  iconClass?: string,
  imgUrl?: string,
  secondary?: boolean,
  tertiary?: boolean,
  disabled?: boolean,
}
export const Button = (props: ButtonProps) => {
  const {url, callback, text, iconClass, imgUrl, secondary, tertiary, textOnly, buttonType, disabled} = props;

  const goTo = (goToUrl: string) => {
    window.location.href = goToUrl; //should eventually replace with react-router-dom
  };

  const buttonCallback = (ev: React.MouseEvent) => {
    if (url) {
      goTo(url);
    } else if (callback) {
      return callback(ev)
    } else {
      return ()=>{};
    }
  }

  const getClassName = () => {
    let returnClass = 'button';
    const classes = {
      secondary,
      tertiary,
      textOnly,
    }
    Object.keys(classes).forEach((key,) => {
      const hasClass = classes[key as keyof  typeof classes];
      returnClass += hasClass ? ` ${key}-button`: '';
    })

    return returnClass;
  }

  return (
    <button disabled={disabled} type={buttonType} onClick={buttonCallback} className={getClassName()}>
      {iconClass && (
        <span className="button-icon">
          <i className={iconClass}></i>
        </span>
      )}
      {imgUrl && (
        <span className="button-image-container">
          <img className="button-image" src={imgUrl} alt={text}/>
        </span>
      )}
      <span className="button-text">
        {text}
      </span>
    </button>
  )
}