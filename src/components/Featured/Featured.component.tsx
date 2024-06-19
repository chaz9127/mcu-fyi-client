import './Featured.component.scss';
import '../../types/Featured';
import { Button } from '../Button/Button.component';

const featuredData = {
  "featured": {
    "logoImageUrl": "/images/logos/Deadpool.png",
    "showTitle": "Deadpool & Wolverine",
    "slug": "deadpool-and-wolverine",
    "watchUrl": "https://www.youtube.com/watch?v=73_1biulkYk",
    "watchIconUrl": "/images/logos/youtube.png"
  }
}

export const Featured = () => {
  return (                 
    <div className="featured-container">
      <div className="featured-tile">
        <div className="featured-buttons">
          <div className="tile-logo">
            <img alt={featuredData.featured.showTitle} src={`${import.meta.env.VITE_CLIENT_URL}${featuredData.featured.logoImageUrl}`} />
          </div>
          <div className="tile-button-container">
            <Button
              url={`${import.meta.env.VITE_CLIENT_URL}/media/${featuredData.featured.slug}`}
              text="Get Info"
              iconClass="fa-solid fa-info"
              tertiary
            />
            <Button
              url={featuredData.featured.watchUrl}
              text="Watch Trailer"
              imgUrl={`${import.meta.env.VITE_CLIENT_URL}${featuredData.featured.watchIconUrl}`}
              tertiary
            />
          </div>
        </div>
      </div>
    </div>
  )
}

