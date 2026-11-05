import './Featured.component.scss';
import '../../types/Featured';
import { Button } from '../Button/Button.component';
import { TrailerButton } from '../TrailerButton/TrailerButton.component';

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

const actionText = featuredData.featured.ticketsUrl ? 'Buy Tickets' :  'Watch Trailer'
const actionLink = featuredData.featured.ticketsUrl ?? featuredData.featured.watchUrl
const actionLogo = featuredData.featured.ticketsLogo ?? `${import.meta.env.VITE_CLIENT_URL}${featuredData.featured.watchIconUrl}`

export const Featured = () => {
  return (                 
    <section className="featured-container">
      <div className="featured-art" aria-hidden="true"></div>
      <div className="featured-content">
        <span className="eyebrow">Featured</span>
        <h1 className="featured-title">
          <img className="featured-logo" alt={featuredData.featured.showTitle} src={`${import.meta.env.VITE_CLIENT_URL}${featuredData.featured.logoImageUrl}`} />
        </h1>
        <div className="featured-actions">
          {/* A tickets link isn't YouTube, so it behaves as a normal button. */}
          <TrailerButton
            url={actionLink}
            title={featuredData.featured.showTitle}
            text={actionText}
            imgUrl={actionLogo}
          />
          <Button
            url={`${import.meta.env.VITE_CLIENT_URL}/media/${featuredData.featured.slug}`}
            text="Get Info"
            iconClass="fa-solid fa-circle-info"
            secondary
          />
        </div>
      </div>
    </section>
  )
}

