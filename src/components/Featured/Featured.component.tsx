import "./Featured.component.scss";
import "../../types/Featured";
import { Button } from "../Button/Button.component";
import { TrailerButton } from "../TrailerButton/TrailerButton.component";
import { FEATURED } from "../../constants/featured";

export const Featured = () => {
  const { ticketsUrl, ticketsLogo, watchUrl, slug, logoImageUrl, showTitle } = FEATURED;

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
