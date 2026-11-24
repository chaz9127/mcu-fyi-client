import "./Footer.component.scss";

// Official TMDB logo. Add the file from TMDB's brand assets at this path.
const TMDB_LOGO_SRC = "/images/logos/tmdb.svg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer-copyright">&copy; {currentYear} TheMCU.FYI. All rights reserved.</p>
      <div className="site-footer-tmdb">
        <img className="site-footer-tmdb-logo" src={`${import.meta.env.VITE_CLIENT_URL}${TMDB_LOGO_SRC}`} alt="The Movie Database (TMDB)" height={12} />
        <p className="site-footer-tmdb-notice">This product uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
      </div>
    </footer>
  );
};
