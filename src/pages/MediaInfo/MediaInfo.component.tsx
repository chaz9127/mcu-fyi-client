import './MediaInfo.scss';
import {
  useParams,
} from "react-router-dom";
import { callApi } from '../../utils/api';
import { useLayoutEffect, useState } from 'react';
import { Media } from '../../types';
import { MediaRow } from '../../components/MediaRow/MediaRow.component';
import { Button } from '../../components/Button/Button.component';
import { Nav } from '../../components/Nav/Nav.component';
import { HasWatched } from '../../components/HasWatched/HasWatched.component';

export const MediaInfo = () => {
  const { slug } = useParams();
  const [media, setMedia] = useState<Media | null>(null);
  const [relatedMedia, setRelatedMedia] = useState<Media[]>([]);

  useLayoutEffect(() => {
    const mediaItem = async () => {
      const data =( await callApi(`/media/${slug}`));
      setMedia(data);
    }

    const mediaRelated = async () => {
      const data =( await callApi(`/media/${slug}/related`));
      setRelatedMedia(data);
    }

    mediaItem();
    mediaRelated();
  }, [slug])
  const relaseDateMilli = media?.releaseDate || 0;
  const releaseDate = new Date(relaseDateMilli);
  const releaseYear = releaseDate.getFullYear();
  const getName = () => {
    let name = media?.name;
    if (media?.season) {
      name += ` - Season ${media.season}`
    }

    return name || '';
  }

  const hasFutureReleaseDate = () => {
      return Date.parse(Date())-(media?.releaseDate || 0) < 0; //Negative number means it is in the future
  }

  const displayMediaInfoButtons = () => {
    return (
      <>
        {media?.playLink && 
          <Button 
            url={media.playLink}
            text="Watch Now"
            imgUrl={`${import.meta.env.VITE_CLIENT_URL}/images/logos/DisneyPlus.png`}
          />
        }
        {media?.trailerLink && 
          <Button 
            url={media.trailerLink}
            text="Watch Trailer"
            secondary
            textOnly
          />
        }
      </>
    )
  }
   
  return (
    <>
      <Nav />
      <div className="media-info-container">
        <div className="media-info-image-container">
          <img className="media-info-image" alt={`poster of ${getName()}`} title={`${getName()}`} src={media?.poster} />
          <div className="mobile-only">
            <h1 className="media-info-title">{getName()}</h1> <span className="media-info-divider">|</span> <span className="media-info-metadata-item">{releaseYear}</span>
          </div>
          { !hasFutureReleaseDate() && <HasWatched slug={media?.slug || ''} name={getName() || ''}/>}
          <div className="media-info-button-container desktop-only">
            {displayMediaInfoButtons()} 
          </div>
        </div>
        <div className="media-info-button-container mobile-only">
          {displayMediaInfoButtons()}
        </div>
        <div className="media-info-details">
          <h1 className="desktop-only media-info-title">{getName()}</h1>
          <div className="desktop-only media-info-metadata">
            <span className="media-info-metadata-item">{releaseYear}</span>
            { media?.duration && 
             <span className="media-info-metadata-item">{media?.duration}</span>
            }
          </div>
          <div className="media-info-block">
            <strong className="media-info-block-title-container">
              <span className="media-info-block-title">Synopsis</span>
            </strong>
            <p className="media-info-block-content">
              {media?.description}
            </p>
          </div>
          {relatedMedia.length > 0 && (
            <div className="media-info-block">
              <strong className="media-info-block-title-container">
                <span className="media-info-block-title">What to watch first:</span>
              </strong>
              {relatedMedia.length > 0 && (
                <MediaRow mediaList={relatedMedia} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}