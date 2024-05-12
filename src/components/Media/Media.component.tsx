import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from '../../features/store';
import  { selectCurrentUser } from '../../features/authSlice';
import { useUpdateUserMutation, updateUser as updateUserAction } from '../../features/userSlice';
import { User } from "../../types";
import { Link } from "react-router-dom";
import { Media as MediaType } from '../../types';
import './Media.component.scss';
import { current } from "@reduxjs/toolkit";

type MediaProps = {
    media: MediaType,
}

export const Media = (props: MediaProps) => {
    const {name, slug, poster, season, type} = props.media;
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const [updateUser] = useUpdateUserMutation()
    const localAccessToken = localStorage.getItem('accessToken');
    const hasWatched = !!(currentUser?.watched?.find( (item: string) => item === slug));
    // const [updateUser] = useUpdateUserMutation();

    const hasUser = Object.keys(currentUser || {}).length > 0;

    useEffect(() => {
        console.log('current = ', currentUser)
    }, [currentUser])

    const toggleWatch = async () => {
        const {email, role, watched} = currentUser;
        let newWatched = [...watched];
        if (hasWatched) {
            //remove
            console.log('removing...')
            const watchedMediaIdx = newWatched.indexOf(slug);
            if (watchedMediaIdx >= 0) { 
                newWatched = newWatched.filter(watchedSlug => {
                    console.log({watchedSlug})
                    return watchedSlug != slug
                })
            }
        } else {
            newWatched.push(slug);
        }
        // const newUser = dispatch(updateUser({watched: newWatched, email, role}));
        const newUser = {watched: newWatched, email, role};
        await updateUser({token: localAccessToken, ...newUser}).then(res => {
            console.log('res2 = ', res)
            dispatch(updateUserAction(newUser))
        })
        console.log({newUser});
        console.log({hasUser})
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