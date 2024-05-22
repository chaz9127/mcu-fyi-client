import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Featured } from '../../components/Featured/Featured.component';
import { Media as MediaType } from '../../types';
import { callApi } from '../../utils/api';
import { Media } from '../../components/Media/Media.component'
import './Home.scss';
import { Nav } from '../../components/Nav/Nav.component';

export const Home = () => {
  const [mediaCollection, setMediaCollection] = useState<Array<MediaType>>([])
  const [sortByValue, setSortByValue] = useState<string>('releaseDate');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    if (searchParams.get('submittedFeedback')) {
      toast('Thanks for the feedback!');
      setSearchParams({submittedFeedback: ''})
    }
  }, [searchParams, setSearchParams]);
  useEffect(() => {
    if (location?.state?.successfulLogin) {
      location.state = {};
      toast('Welcome back!');
    } else if (location?.state?.successfulRegister) {
      location.state = {};
      toast('Welcome!');
    } else if (location?.state?.logout) {
      location.state = {};
      toast('Successfully logged out.')
    }
  })
  const sortByCompare = (a: MediaType, b: MediaType) => {
    if (sortByValue === 'name') {
      if ( a[sortByValue] < b[sortByValue]) {
        return -1;
      } else if ( a[sortByValue] > b[sortByValue]) {
        return 1;
      } else {
        return 0;
      }
    } else if (sortByValue === 'releaseDate' || sortByValue === 'chronologicalOrder') {
      return a[sortByValue] - b[sortByValue];
    }
    return 0;
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

  const setSort = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortByValue((e.target as HTMLInputElement).value);
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
            <option value='chronologicalOrder'>Chronologically</option>
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
