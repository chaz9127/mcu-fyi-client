import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button.component';
import './TrailerButton.component.scss';

type TrailerButtonProps = {
  url: string,
  title: string,
  text?: string,
  iconClass?: string,
  imgUrl?: string,
  secondary?: boolean,
}

const getYouTubeId = (url: string) => {
  try {
    const { hostname, searchParams } = new URL(url);
    return /(^|\.)youtube\.com$/.test(hostname) ? searchParams.get('v') : null;
  } catch {
    return null;
  }
}

// Plays YouTube links in a modal. Anything else can't be embedded, so it stays an ordinary link.
export const TrailerButton = (props: TrailerButtonProps) => {
  const { url, title, text = 'Watch Trailer', iconClass, imgUrl, secondary } = props;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoId = getYouTubeId(url);

  useEffect(() => {
    if (open && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [open]);

  if (!videoId) {
    return <Button url={url} text={text} iconClass={iconClass} imgUrl={imgUrl} secondary={secondary} />
  }

  return (
    <>
      <Button callback={() => setOpen(true)} text={text} iconClass={iconClass} imgUrl={imgUrl} secondary={secondary} />
      {/* Only rendered while open, so closing also stops the video. */}
      {open && (
        <dialog
          ref={dialogRef}
          className="trailer-modal"
          aria-label={`${title} trailer`}
          onClose={() => setOpen(false)}
          onClick={(e) => {
            // The content fills the dialog, so a click on the dialog itself is on the backdrop.
            if (e.target === e.currentTarget) dialogRef.current?.close();
          }}
        >
          <div className="trailer-modal-content">
            <div className="trailer-modal-header">
              <h2 className="trailer-modal-title">{title}</h2>
              <a className="trailer-modal-link" href={url} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
              <button
                type="button"
                className="trailer-modal-close"
                aria-label="Close trailer"
                onClick={() => dialogRef.current?.close()}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <iframe
              className="trailer-modal-video"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
              title={`${title} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </dialog>
      )}
    </>
  )
}
