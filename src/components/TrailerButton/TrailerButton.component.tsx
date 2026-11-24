import { useState } from 'react';
import { Button } from '../Button/Button.component';
import { TrailerModal, getYouTubeId } from '../TrailerModal/TrailerModal.component';

type TrailerButtonProps = {
  url: string,
  text?: string,
  iconClass?: string,
  imgUrl?: string,
  secondary?: boolean,
}

export const TrailerButton = (props: TrailerButtonProps) => {
  const { url, text = 'Watch Trailer', iconClass, imgUrl, secondary } = props;
  const [isOpen, setIsOpen] = useState(false);
  const videoId = getYouTubeId(url);

  // Non-YouTube links can't be embedded, so fall back to a new tab
  if (!videoId) {
    return <Button url={url} newTab text={text} iconClass={iconClass} imgUrl={imgUrl} secondary={secondary} />
  }

  return (
    <>
      <Button
        callback={() => setIsOpen(true)}
        text={text}
        iconClass={iconClass}
        imgUrl={imgUrl}
        secondary={secondary}
      />
      <TrailerModal
        videoId={videoId}
        title={text}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
