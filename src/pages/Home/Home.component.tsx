import { useState, useEffect } from 'react';
import { Featured } from '../../components/Featured/Featured.component';
import { Media as MediaType } from '../../types';
import { callApi } from '../../utils/api';
import { Media } from '../../components/Media/Media.component'
import './Home.scss';
import { Nav } from '../../components/Nav/Nav.component';

export const Home = () => {
  const [mediaCollection, setMediaCollection] = useState<Array<MediaType>>([])
  const [sortByValue, setSortByValue] = useState<string>('releaseDate');

  const sortByCompare = (a, b) => {
    if (sortByValue === 'name') {
      if ( a[sortByValue] < b[sortByValue]) {
        return -1;
      } else if ( a[sortByValue] > b[sortByValue]) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return a['releaseDate'] - b['releaseDate'];
    }
    
  }

  useEffect(() => {
    const getMedia = async () => {
      const data = await callApi(`/media`);
      setMediaCollection(data);
    }
    
    getMedia();
    
  }, [])

  useEffect(() => {
    setMediaCollection([...mediaCollection].sort(sortByCompare));
  }, [sortByValue])

  const setSort = (e: React.FormEvent<HTMLInputElement>) => {
    setSortByValue(e.target.value);
  }

  return (
    <>
      <Nav />
      <div className="app-container">
        <Featured />
        <div className="filter-bar">
          <label>Sort By:</label>
          <select className="select-menu" onChange={setSort}>
            <option value='releaseDate'>Release Date</option>
            <option value='name'>Title</option>
          </select>
        </div>
        <div className="app-content">
          {mediaCollection.map((media: MediaType, idx: number) => {
              return (
                <div className="media-container" key={idx}>
                  <Media media={media}/>
                </div>
              )
            })}
        </div>
      </div>
    </>
  );
}
