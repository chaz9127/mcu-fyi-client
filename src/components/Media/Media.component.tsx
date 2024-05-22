import { Link } from "react-router-dom";
import { Media as MediaType } from '../../types';
import './Media.component.scss';
import 'react-toastify/dist/ReactToastify.css';
import { HasWatched } from "../HasWatched/HasWatched.component";

type MediaProps = {
    media: MediaType,
}

export const Media = (props: MediaProps) => {
    const {name, slug, poster, season, type} = props.media;
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
            <HasWatched slug={slug} name={name} />
        </div>
    )
}