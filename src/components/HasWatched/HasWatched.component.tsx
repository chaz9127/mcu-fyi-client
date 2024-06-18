import './HasWatched.component.scss';
import { useDispatch, useSelector } from "react-redux";
import { callPatch } from "../../utils/callApi";
import type { AppDispatch } from '../../features/store';
import  { selectCurrentUser, updateUser as updateUserAction } from '../../features/authSlice';
import './HasWatched.component.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

type HasWatchedProps = {
    name: string,
    slug: string,
}

export const HasWatched = (props: HasWatchedProps) => {
    const {name, slug } = props;
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const hasUser = Object.keys(currentUser || {}).length > 0;
    const hasWatched = !!(currentUser?.watched?.find( (item: string) => item === slug));
    const localAccessToken = localStorage.getItem('accessToken') || '';
    const navigate = useNavigate();

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

    const goToAuthenticate = () => {
        navigate('/auth');
    }

    if (hasUser) {
        return (
            <>
                <div className="watched-banner" onClick={toggleWatch}>
                    {hasWatched
                        ? <i
                            className="fa-solid fa-check"
                            data-tooltip-id={`${slug}-watched-icon`} 
                            data-tooltip-content="Remove from watched"
                            data-tooltip-place="top"
                        ></i>
                        : <i
                            className="fa-regular fa-eye-slash"    
                            data-tooltip-id={`${slug}-watched-icon`} 
                            data-tooltip-content="Add to watched"
                            data-tooltip-place="top"
                        ></i>
                    }
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="watched-banner" onClick={goToAuthenticate}>
                    <i
                        className="fa-regular fa-eye-slash"
                        data-tooltip-id={`${slug}-watched-icon`} 
                        data-tooltip-content="Login or Register to Add"
                        data-tooltip-place="top"
                    ></i>
                </div>
            </>
        )
    }
}