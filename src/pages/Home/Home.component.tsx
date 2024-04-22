leimport { useState, useEffect } from 'react';
import { Featured } from '../../components/Featured/Featured.component';
import { Media as MediaType } from '../../types';
import { callApi } from '../../utils/api';
import { Media } from '../../components/Media/Media.component'
import './Home.scss';
import { Nav } from '../../components/Nav/Nav.component';

export const Home = () => {
  const [mediaCollection, setMediaCollection] = useState<Array<MediaType>>([])

  useEffect(() => {
    const getMedia = async () => {
      const data = await callApi(`/media`);
      setMediaCollection(data);
    }
    
    getMedia();
    
  }, [])

  return (
    <>
      <Nav />
      <div className="app-container">
        <Featured />
        <div className="app-content">
          {mediaCollection.map((media: MediaType, idx: number) => {
              return (
                <div className="media-container">
                  <Media media={media} key={idx}/>
                </div>
              )
            })}
        </div>
      </div>
    </>
  );
}
