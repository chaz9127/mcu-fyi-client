import { useDispatch, useSelector } from "react-redux";
import { callPatch } from "../../utils/callApi";
import type { AppDispatch } from '../../features/store';
import  { selectCurrentUser, updateUser as updateUserAction } from '../../features/authSlice';
import { Link } from "react-router-dom";
import { Media as MediaType } from '../../types';
import './Media.component.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type MediaProps = {
    media: MediaType,
}

export const Media = (props: MediaProps) => {
    const {name, slug, poster, season, type} = props.media;
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const localAccessToken = localStorage.getItem('accessToken') || '';
    const hasWatched = !!(currentUser?.watched?.find( (item: string) => item === slug));

    const hasUser = Object.keys(currentUser || {}).length > 0;

    const toggleWatch = async () => {
        const {email, role, watched} = currentUser;
        let successFullToastMessage = '';
        let newWatched = [...watched];
        if (hasWatched) {
            const watchedMediaIdx = newWatched.indexOf(slug);
            if (watchedMediaIdx >= 0) { 
                newWatched = newWatched.filter(watchedSlug => {
                    successFullToastMessage = `Removed ${name} from your Watched List`;
                    return watchedSlug != slug;
                })
            }
        } else {
            successFullToastMessage = `Added ${name} to your Watched List`;
            newWatched.push(slug);
        }
        const newUser = {watched: newWatched, email, role};
        const updatedUserResponse = await callPatch(localAccessToken, newUser);
        
        if (updatedUserResponse.status === 201) {
            dispatch(updateUserAction(newUser));
            toast(successFullToastMessage);
        } else {
            toast.error(updatedUserResponse.statusText);
        }
    };
    const displayWatchedBanner = () => {
        if (!hasUser) return '';

        return (
            <div className="watched-banner" onClick={toggleWatch}>
                {hasWatched
                    ? <i className="fa-solid fa-check"></i>
                    : <i className="fa-regular fa-eye-slash"></i>
                }
            </div>
        )
    }
    return (
        <div title={name} className="media">
            <Link to={`/media/${slug}`}>
                <img alt={`${name} poster`} className="media-poster" src={poster} />
                <span className="media-title">{name}</span>
                <div className="media-metadata">
                    <span className="media-type">{type || 'Movie'}</span>
                    <span className="media-season">{season ? `Season ${season}` : ''}</span>
                </div>
            </Link>
            <div className="inner-boxshadow">
            </div>
            {displayWatchedBanner()}
        </div>
    )
}