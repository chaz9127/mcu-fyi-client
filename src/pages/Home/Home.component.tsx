import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useSearchParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Featured } from '../../components/Featured/Featured.component';
import { Media as MediaType } from '../../types';
import { callApi } from '../../utils/api';
import { Media } from '../../components/Media/Media.component'
import  { selectCurrentUser } from '../../features/authSlice';
import './Home.scss';
import { Nav } from '../../components/Nav/Nav.component';

export const Home = () => {
  const currentUser = useSelector(selectCurrentUser);
  const hasUser = Object.keys(currentUser || {}).length > 0;
  const [initialMediaCollection, setInitialMediaCollection] = useState<Array<MediaType>>([]);
  const [mediaCollection, setMediaCollection] = useState<Array<MediaType>>([]);
  const [sortByValue, setSortByValue] = useState<string>('releaseDate');
  const [filterByValue, setFilterByValue] = useState<string>('all');
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
      setInitialMediaCollection(data);
    }
    
    getMedia();
    
  }, [])

  useEffect(() => {
    const newMediaCollection = [...initialMediaCollection].filter(mediaItem => {
      if (filterByValue === 'watched') {
        return currentUser.watched.indexOf(mediaItem.slug) > -1
      } else if (filterByValue === 'unwatched') {
        return currentUser.watched.indexOf(mediaItem.slug) === -1
      } else {
        return true;
      }
    }).sort(sortByCompare);
    setMediaCollection(newMediaCollection);
  }, [sortByValue, filterByValue])

  const setSort = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortByValue((e.target as HTMLInputElement).value);
  }

  return (
    <>
      <Nav />
      <div className="app-container">
        <Featured />
        <div className="app-content">
          <div className="filter-bar">
            <div className="filter-bar-item">
              <label htmlFor="sort-by">Sort By:</label>
              <select id="sort-by" className="select-menu" onChange={setSort}>
                <option value='releaseDate'>Release Date</option>
                <option value='chronologicalOrder'>Chronologically</option>
                <option value='name'>Title</option>
              </select>
            </div>
            {hasUser && <div className="filter-bar-item">
              <label>Filter By:</label>
              <div className="radio-menu-dropdown">
                <div className="radio-menu-item">
                  <input checked={filterByValue === 'watched'} onChange={(e) => {setFilterByValue(e.target.value)}} type="radio" id="radio-watched" name="filter-by" value="watched" />
                  <label htmlFor="radio-watched">Watched</label>
                </div>
                <div className="radio-menu-item">
                  <input checked={filterByValue === 'unwatched'} onChange={(e) => {setFilterByValue(e.target.value)}} type="radio" id="radio-unwatched" name="filter-by" value="unwatched" />
                  <label htmlFor="radio-unwatched">Unwatched</label>
                </div>
                <div className="radio-menu-item">
                  <input checked={filterByValue === 'all'} onChange={(e) => {setFilterByValue(e.target.value)}} type="radio" id="radio-all" name="filter-by" value="all" />
                  <label htmlFor="radio-all">All</label>
                </div>
              </div>
            </div>
            }
          </div>
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
