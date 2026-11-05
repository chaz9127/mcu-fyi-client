import { Link } from "react-router-dom";
import { Media as MediaType } from '../../types';
import './Media.component.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { HasWatched } from "../HasWatched/HasWatched.component";
import { Poster } from "../Poster/Poster.component";

type MediaProps = {
    media: MediaType,
    order?: number,
}

export const Media = (props: MediaProps) => {
    const {name, slug, poster, season, type, releaseDate} = props.media;
    const { order } = props;
    
    const hasFutureReleaseDate = () => {
        return Date.parse(Date())-releaseDate < 0; //Negative number means it is in the future
    }

    return (
        <div title={name} className="media">
            <Link to={`/media/${slug}`}>
                <div className="media-frame">
                    <Poster className="media-poster" src={poster} name={name} alt={`${name} poster`} width={400} lazy />
                    {order && <span className="media-order">{String(order).padStart(2, '0')}</span>}
                </div>
                <span className="media-title">{name}</span>
                <div className="media-metadata">
                    <span className="media-type">{type || 'Movie'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{season ? `Season ${season}` : new Date(releaseDate).getFullYear()}</span>
                </div>
            </Link>
            {!hasFutureReleaseDate() && <HasWatched slug={slug} name={name} />}
            <Tooltip id={`${slug}-watched-icon`} />
        </div>
    )
}
