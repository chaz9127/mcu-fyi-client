import "./Featured.component.scss";
import "../../types/Featured";
import { Button } from "../Button/Button.component";
import { TrailerButton } from "../TrailerButton/TrailerButton.component";

const featuredData = {
  featured: {
    logoImageUrl: "/images/logos/doomsday.png",
    showTitle: "Avengers: Doomsday",
    slug: "avengers-doomsday",
    watchUrl: "https://www.youtube.com/watch?v=1pHDWnXmK7Y&ab_channel=MarvelEntertainment",
    ticketsUrl: "https://www.fandango.com/avengers-doomsday-2026-237176/movie-overview",
    ticketsLogo: "/images/logos/fandango.webp",
  },
};

export const Featured = () => {
  const { ticketsUrl, ticketsLogo, watchUrl, slug, logoImageUrl, showTitle } = featuredData.featured;

  return (
    <section className="featured-container">
      <div className="featured-art" aria-hidden="true"></div>
      <div className="featured-content">
        <span className="eyebrow">Featured</span>
        <h1 className="featured-title">
          <img className="featured-logo" alt={showTitle} src={`${import.meta.env.VITE_CLIENT_URL}${logoImageUrl}`} />
        </h1>
        <div className="featured-actions">
          {ticketsUrl && <Button url={ticketsUrl} newTab text="Buy Tickets" imgUrl={`${import.meta.env.VITE_CLIENT_URL}${ticketsLogo}`} />}
          <TrailerButton url={watchUrl} text="Watch Trailer" iconClass="fa-solid fa-play" secondary />
          <Button url={`${import.meta.env.VITE_CLIENT_URL}/media/${slug}`} text="Get Info" iconClass="fa-solid fa-circle-info" secondary />
        </div>
      </div>
    </section>
  );
};
