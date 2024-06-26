import { Link } from "react-router-dom";
import { Media as MediaType } from '../../types';
import './Media.component.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { HasWatched } from "../HasWatched/HasWatched.component";

type MediaProps = {
    media: MediaType,
}

export const Media = (props: MediaProps) => {
    const {name, slug, poster, season, type, releaseDate} = props.media;
    
    const hasFutureReleaseDate = () => {
        return Date.parse(Date())-releaseDate < 0; //Negative number means it is in the future
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
            {!hasFutureReleaseDate() && <HasWatched slug={slug} name={name} />}
            <Tooltip id={`${slug}-watched-icon`} />
        </div>
    )
}