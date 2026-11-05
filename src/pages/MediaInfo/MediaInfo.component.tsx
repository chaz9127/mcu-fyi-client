import './MediaInfo.scss';
import {
  useParams,
} from "react-router-dom";
import { callApi } from '../../utils/api';
import { useLayoutEffect, useState } from 'react';
import { Media } from '../../types';
import { MediaRow } from '../../components/MediaRow/MediaRow.component';
import { Button } from '../../components/Button/Button.component';
import { TrailerButton } from '../../components/TrailerButton/TrailerButton.component';
import { Nav } from '../../components/Nav/Nav.component';
import { HasWatched } from '../../components/HasWatched/HasWatched.component';
import { Tooltip } from 'react-tooltip';
import { Poster } from '../../components/Poster/Poster.component';

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
    if (!media?.playLink && !media?.trailerLink) return null;

    return (
      <div className="media-info-button-container">
        {media?.playLink && 
          <Button 
            url={media.playLink}
            text="Watch Now"
            imgUrl={`${import.meta.env.VITE_CLIENT_URL}/images/logos/DisneyPlus.png`}
          />
        }
        {media?.trailerLink && 
          <TrailerButton
            url={media.trailerLink}
            title={getName()}
            iconClass="fa-solid fa-play"
            secondary
          />
        }
      </div>
    )
  }
   
  return (
    <>
      <Nav />
      <div className="media-info-page">
        {media && (
          <div
            className="media-info-backdrop"
            aria-hidden="true"
            style={{ '--backdrop-image': `url("${media.poster}")` } as React.CSSProperties}
          ></div>
        )}
        <main className="media-info-container">
          <div className="media-info-image-container">
            {media
              ? <Poster className="media-info-image" src={media.poster} name={media.name} alt={`poster of ${getName()}`} width={640} />
              : <div className="media-info-image skeleton"></div>
            }
            {media && !hasFutureReleaseDate() && (
              <>
                <HasWatched slug={media.slug} name={getName()}/>
                <Tooltip id={`${media.slug}-watched-icon`} />
              </>
            )}
          </div>
          {media ? (
            <div className="media-info-details">
              <div className="media-info-metadata">
                <span className="media-info-metadata-item">{media.type || 'Movie'}</span>
                {media.season && <span className="media-info-metadata-item">Season {media.season}</span>}
                <span className="media-info-metadata-item">{releaseYear}</span>
                {media.duration && <span className="media-info-metadata-item">{media.duration}</span>}
              </div>
              <h1 className="media-info-title">{media.name}</h1>
              {displayMediaInfoButtons()}
              <section className="media-info-block">
                <h2 className="eyebrow media-info-block-title">Synopsis</h2>
                <p className="media-info-block-content">
                  {media.description}
                </p>
              </section>
              {relatedMedia.length > 0 && (
                <section className="media-info-block">
                  <h2 className="eyebrow media-info-block-title">What to watch first</h2>
                  <MediaRow mediaList={relatedMedia} />
                </section>
              )}
            </div>
          ) : (
            <div className="media-info-details">
              <div className="media-info-placeholder is-title skeleton"></div>
              <div className="media-info-placeholder is-text skeleton"></div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
