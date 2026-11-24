import { useEffect, useRef } from 'react';
import './TrailerModal.component.scss';

/** Returns the YouTube video id for watch / youtu.be links, or null for anything else. */
export const getYouTubeId = (url: string): string | null => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    if (hostname === 'youtu.be') return pathname.slice(1) || null;
    if (hostname === 'youtube.com' || hostname.endsWith('.youtube.com')) {
      return searchParams.get('v');
    }
  } catch {
    // not a parseable URL
  }
  return null;
};

type TrailerModalProps = {
  videoId: string,
  title: string,
  open: boolean,
  onClose: () => void,
}

export const TrailerModal = ({ videoId, title, open, onClose }: TrailerModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="trailer-modal"
      onClose={onClose}
      onClick={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}
    >
      <button type="button" className="trailer-modal-close" aria-label="Close trailer" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      {/* iframe only mounts while open, so the video stops when the modal closes */}
      <div className="trailer-modal-frame">
        {open && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </dialog>
  );
};
