import './Button.component.scss';
type ButtonProps = {
  text: string,
  url?: string,
  callback?: (e: Event) => void,
  textOnly?: boolean,
  buttonType?: "button" | "submit" | "reset" | undefined,
  iconClass?: string,
  imgUrl?: string,
  secondary?: boolean,
  tertiary?: boolean,
}
export const Button = (props: ButtonProps) => {
  const {url, callback, text, iconClass, imgUrl, secondary, tertiary, textOnly, buttonType} = props;

  const goTo = (goToUrl: string) => {
    window.location.href = goToUrl; //should eventually replace with react-router-dom
  };

  const buttonCallback = () => {
    if (url) {
      goTo(url);
    } else if (callback) {
      return callback
    } else {
      return undefined;
    }
  }

  const getClassName = () => {
    let returnClass = 'button';
    const classes = {
      secondary,
      tertiary,
      textOnly,
    }

    Object.keys(classes).forEach(key => {
      returnClass += classes[key as keyof Object] ? ` ${key}-button`: '';
    })

    return returnClass;
  }

  return (
    <button type={buttonType} onClick={buttonCallback} className={getClassName()}>
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