
import { Link } from "react-router-dom";
import { Media as MediaType } from '../../types';
import './Media.component.scss'

type MediaProps = {
    media: MediaType,
}

export const Media = (props: MediaProps) => {
    const {name, slug, poster, season, type} = props.media;
    const toggleWatch = () => {
        alert('toggle!')
    };
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
            <div className="watched-banner" onClick={toggleWatch}>
                <i className="fa-solid fa-check"></i>
            </div>
        </div>
    )
}