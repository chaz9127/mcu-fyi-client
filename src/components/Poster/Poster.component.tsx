import { useState } from 'react';
import './Poster.component.scss';

type PosterProps = {
  src: string,
  name: string,
  alt: string,
  width: number,
  className: string,
  lazy?: boolean,
}

// The stored IMDb URLs ask for a 190px image. Their suffix sets the size, so ask for what we display.
const getSizedUrl = (src: string, width: number) => {
  return src?.replace(/\._V1_QL75_[^.]*\.jpg$/, `._V1_QL75_UX${width}_.jpg`);
}

export const Poster = (props: PosterProps) => {
  const { src, name, alt, width, className, lazy } = props;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div className={`${className} poster-fallback`} role="img" aria-label={alt}>
        <span className="poster-fallback-name">{name}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      alt={alt}
      src={getSizedUrl(src, width)}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  )
}
