import './Featured.component.scss';
import '../../types/Featured';
import { Button } from '../Button/Button.component';

const featuredData = {
  "featured": {
    "logoImageUrl": "/images/logos/braveNewWorld.webp",
    "showTitle": "Captain America: Brave New World",
    "slug": "captain-america-brave-new-world",
    "watchUrl": "https://www.youtube.com/watch?v=1pHDWnXmK7Y&ab_channel=MarvelEntertainment",
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

