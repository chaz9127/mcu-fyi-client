import { Button } from '../Button/Button.component';

type TrailerButtonProps = {
  url: string,
  text?: string,
  iconClass?: string,
  imgUrl?: string,
  secondary?: boolean,
}

export const TrailerButton = (props: TrailerButtonProps) => {
  const { url, text = 'Watch Trailer', iconClass, imgUrl, secondary } = props;

  return <Button url={url} newTab text={text} iconClass={iconClass} imgUrl={imgUrl} secondary={secondary} />
}
