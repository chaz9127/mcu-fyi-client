import './Featured.component.scss';
import '../../types/Featured';
import { Button } from '../Button/Button.component';

const featuredData = {
  "featured": {
    "logoImageUrl": "/images/logos/braveNewWorld.webp",
    "showTitle": "Captain America: Brave New World",
    "slug": "captain-america-brave-new-world",
    "watchUrl": "https://www.youtube.com/watch?v=1pHDWnXmK7Y&ab_channel=MarvelEntertainment",
    "watchIconUrl": "/images/logos/youtube.png",
    "ticketsUrl": "https://www.fandango.com/captain-america-brave-new-world-2025-237015/movie-overview",
    "ticketsLogo": "/images/logos/fandango.webp",

  }
}

const tertiaryText = featuredData.featured.ticketsUrl ? 'Buy Tickets' :  'Watch Trailer'
const tertiaryLink = featuredData.featured.ticketsUrl ?? featuredData.featured.watchUrl
const tertiaryLogo = featuredData.featured.ticketsLogo ?? `${import.meta.env.VITE_CLIENT_URL}${featuredData.featured.watchIconUrl}`

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
              url={tertiaryLink}
              text={tertiaryText}
              imgUrl={tertiaryLogo}
              tertiary
            />
          </div>
        </div>
      </div>
    </div>
  )
}

