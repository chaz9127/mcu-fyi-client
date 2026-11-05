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
import { Tabs } from '../../components/Tabs/Tabs.component';

const SORT_OPTIONS = [
  { value: 'releaseDate', tab: 'Release Date', heading: 'In release order' },
  { value: 'chronologicalOrder', tab: 'Chronological', heading: 'In story order' },
  { value: 'name', tab: 'Title', heading: 'Every title, A to Z' },
];

const FILTER_OPTIONS = [
  { value: 'all', tab: 'All' },
  { value: 'unwatched', tab: 'Unwatched' },
  { value: 'watched', tab: 'Watched' },
];

export const Home = () => {
  const currentUser = useSelector(selectCurrentUser);
  const hasUser = Object.keys(currentUser || {}).length > 0;
  const [initialMediaCollection, setInitialMediaCollection] = useState<Array<MediaType>>([]);
  const [mediaCollection, setMediaCollection] = useState<Array<MediaType>>([]);
  const [sortByValue, setSortByValue] = useState<string>('releaseDate');
  const [filterByValue, setFilterByValue] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
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
      try {
        const data = await callApi(`/media`);
        setMediaCollection(data);
        setInitialMediaCollection(data);
      } finally {
        setLoading(false);
      }
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

  // The position only means something while the whole list is in timeline order.
  const showOrder = sortByValue !== 'name' && filterByValue === 'all';
  const heading = SORT_OPTIONS.find(option => option.value === sortByValue)?.heading;

  const getEmptyMessage = () => {
    if (filterByValue === 'watched') return "You haven't marked anything as watched yet.";
    if (filterByValue === 'unwatched') return "You've watched everything. Time for a rewatch.";
    return "We couldn't load the titles. Please try again in a moment.";
  }

  return (
    <>
      <Nav />
      <Featured />
      <main className="app-content">
        <div className="filter-bar">
          <div>
            <span className="eyebrow">{loading ? 'Loading' : `${mediaCollection.length} titles`}</span>
            <h2 className="collection-title">{heading}</h2>
          </div>
          <div className="filter-bar-controls">
            {hasUser && (
              <Tabs
                label="Filter by"
                tabs={FILTER_OPTIONS.map(({ value, tab }) => ({
                  title: tab,
                  value,
                  active: filterByValue === value,
                  setTab: () => setFilterByValue(value),
                }))}
              />
            )}
            <Tabs
              label="Sort by"
              tabs={SORT_OPTIONS.map(({ value, tab }) => ({
                title: tab,
                value,
                active: sortByValue === value,
                setTab: () => setSortByValue(value),
              }))}
            />
          </div>
        </div>
        {!loading && mediaCollection.length === 0 && (
          <div className="collection-empty">{getEmptyMessage()}</div>
        )}
        <div className="media-grid">
          {loading && Array.from({ length: 14 }, (_, idx) => (
            <div className="media-skeleton skeleton" key={idx}></div>
          ))}
          {mediaCollection.map((media: MediaType, idx: number) => {
            return <Media media={media} order={showOrder ? idx + 1 : undefined} key={media._id} />
          })}
        </div>
      </main>
    </>
  );
}
