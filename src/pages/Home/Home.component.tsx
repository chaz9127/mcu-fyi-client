import { useState, useEffect } from 'react';
import { Featured } from '../../components/Featured/Featured.component';
import { Media } from '../../types';
import { callApi } from '../../utils/api';
import { Link } from "react-router-dom";
import './Home.scss';

export const Home = () => {
  // const [phases, setPhases] = useState<Array<Array<Media>>>([]);
  const [mediaCollection, setMediaCollection] = useState<Array<Media>>([])

  useEffect(() => {
    const getMedia = async () => {
      const data = await callApi(`/media`);
      setMediaCollection(data);
    }
    
    getMedia();
    
  }, [])

  return (
    <div className="app-container">
      <Featured />
      <div className="app-content">
        {mediaCollection.map((media: Media, idx: number) => {
            return (
              <>
                <div title={media.name} key={idx} className="media">
                  <Link to={`/media/${media.slug}`}>
                    <img alt={`${media.name} poster`} className="media-poster" src={media.poster} />
                    <span className="media-title">{media.name}</span>
                    <div className="media-metadata">
                      <span className="media-type">{media.type || 'Movie'}</span>
                      <span className="media-season">{media.season ? `Season ${media.season}` : ''}</span>
                    </div>
                  </Link>
                  <div className="inner-boxshadow">
                  </div>
                </div>
              </>
            )
          })}
      </div>
    </div>
  );
}
