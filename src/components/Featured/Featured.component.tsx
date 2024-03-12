import './Featured.component.scss';
import '../../types/Featured';
import { Button } from '../Button/Button.component';

const featuredData = {
  "featured": {
    "logoImageUrl": "/images/logos/Loki.png",
    "showTitle": "Loki",
    "watchUrl": "https://www.disneyplus.com/series/loki/6pARMvILBGzF",
    "watchIconUrl": "/images/logos/DisneyPlus.png"
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
              url={`${import.meta.env.VITE_CLIENT_URL}/media/${featuredData.featured.showTitle}`}
              text="Get Info"
              iconClass="fa-solid fa-info"
              tertiary
            />
            <Button
              url={featuredData.featured.watchUrl}
              text="Watch Now"
              imgUrl={`${import.meta.env.VITE_CLIENT_URL}${featuredData.featured.watchIconUrl}`}
              tertiary
            />
          </div>
        </div>
      </div>
    </div>
  )
}

