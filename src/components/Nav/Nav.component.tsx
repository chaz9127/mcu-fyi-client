import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../features/store';
import { INITIAL_NAVIGATION_STATE } from '../../constants/state';
import  { selectCurrentUser, logOut, setCredientals } from '../../features/authSlice';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { SearchBar } from '../SearchBar/SearchBar.component';
import './Nav.component.scss';
import { callApi } from '../../utils/api';
import { Media } from '../../types';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginWithTokenMutation } from '../../features/authApiSlice';

export const Nav = () => {
  const [ showNavMenu, setShowNavMenu ] = useState(false);
  const [ searchPool, setSearchPool ] = useState<Media[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch.withTypes<AppDispatch>()();
  const localAccessToken = localStorage.getItem('accessToken');
  const [loginWithToken] = useLoginWithTokenMutation();
  const noCurrentUser = currentUser === null || Object.keys(currentUser).length === 0;
  
  const switchShowNavMenu = () => {setShowNavMenu(!showNavMenu)};
  const hideShowNavMenu = (ele:Event) => {
    const clickedToggle = !!(ele?.target as HTMLElement).closest?.('.nav-toggle');
    !clickedToggle && setShowNavMenu(false);
  };

  useEffect(() => {
    if (localAccessToken && noCurrentUser) {
      try{
        loginWithToken({token: localAccessToken}).then(res => {
          if('data' in res) {
            if (res.data.email) {
              dispatch(setCredientals({ ...res['data'], accessToken: localAccessToken }));
            }
          } else if('error' in res) {
            // login has expired
            dispatch(logOut());
          }
        })
      } catch(err) {
        dispatch(logOut());
      }
      
    }
  }, [localAccessToken, dispatch, noCurrentUser, loginWithToken]);

  useEffect(() => {
    try {
      if (state && state.logout) {
        dispatch(logOut());
        navigate('/', {state: INITIAL_NAVIGATION_STATE});
      }
    }
    catch(err) {
      console.error('Failed to logout');
    }
  }, [state, dispatch, navigate])
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.addEventListener('click', hideShowNavMenu, false);

    return () => html.removeEventListener('click', hideShowNavMenu, false);
  }, [])  

  useEffect(() => {
    const getMedia = async () => {
      const data = await callApi(`/media`);
      return data;
    }
  
    const getSearchPool = async () => {
      const allMedia: Media[] = await getMedia();
      
      setSearchPool(allMedia);
    }
    getSearchPool();
    
  }, [])

  const getAuthItem = () => {
    if (!noCurrentUser) {
      return (
        <li className="nav-menu-item">
          <Link to="/" state={{ logout: true }} >
            <i className="fa-solid fa-right-from-bracket nav-menu-icon"></i>
            Logout
          </Link>
        </li>
      )
    } else {
      return (
        <li className="nav-menu-item">
          <Link to="/auth">
            <i className="fa-solid fa-user-plus nav-menu-icon"></i>
            Login / Register
          </Link>
        </li>
      )
    }
  }

  const getNavItems = (tooltipPlace: 'bottom' | 'left') => (
    <>
      <li className="nav-menu-item">
        <Link to="/feedback">
          <i className="fa-solid fa-comment-dots nav-menu-icon"></i>
          Feedback
        </Link>
      </li>
      <li
        className="nav-menu-item"
        data-tooltip-id="donate-buttom-img"
        data-tooltip-content="Coming Soon"
        data-tooltip-place={tooltipPlace}
      >
        <Link to="/">
          <i className="fa-solid fa-coins nav-menu-icon"></i>
          Donate
        </Link>
      </li>
      {getAuthItem()}
    </>
  );

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          <span>TheMcu.fyi</span>
        </Link>
        <SearchBar results={searchPool} />
        <ul className="nav-links">
          {getNavItems('bottom')}
        </ul>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={showNavMenu}
          onClick={switchShowNavMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        {showNavMenu && (
          <ul className="nav-menu">
            {getNavItems('left')}
          </ul>
        )}
        <div className="donate">
          <div id="donate-button">
            <img
              className="donate-buttom-img"
              alt="Donate via Paypal"
              src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif'
              data-tooltip-id="donate-buttom-img"
              data-tooltip-content="Coming Soon"
              data-tooltip-place="bottom"
            />
          </div>
        </div>
      </nav>
      <Tooltip id="donate-buttom-img" />
    </header>
  )
}

