import Button from "./Button";

const featuredData = {
  logoImageUrl: "/images/logos/braveNewWorld.webp",
  showTitle: "Captain America: Brave New World",
  slug: "captain-america-brave-new-world",
  watchUrl: "https://www.youtube.com/watch?v=1pHDWnXmK7Y&ab_channel=MarvelEntertainment",
  watchIconUrl: "/images/logos/youtube.png",
  ticketsUrl: "https://www.fandango.com/captain-america-brave-new-world-2025-237015/movie-overview",
  ticketsLogo: "/images/logos/fandango.webp",
};

const tertiaryText = featuredData.ticketsUrl ? "Buy Tickets" : "Watch Trailer";
const tertiaryLink = featuredData.ticketsUrl ?? featuredData.watchUrl;
const tertiaryLogo = featuredData.ticketsLogo ?? featuredData.watchIconUrl;

export default function Featured() {
  return (
    <div
      className="relative z-[1] box-border max-h-[500px] min-h-[335px] w-full bg-[#578698] pb-0 pr-8 shadow-[0_0_10px] md:pl-32"
      style={{
        backgroundImage: "url(/images/show-thumbnails/braveNewWorldThumbnail.png)",
        backgroundRepeat: "no-repeat",
        aspectRatio: "3/1",
        backgroundSize: "auto 100%",
        backgroundPosition: "right",
      }}
    >
      <div className="absolute top-1/2 w-full max-w-[440px] -translate-y-1/2 max-md:flex max-md:max-w-full max-md:flex-col max-md:justify-evenly max-[480px]:p-4">
        <div className="max-w-[540px]">
          <div className="mb-10 max-md:mb-4">
            <img
              alt={featuredData.showTitle}
              src={featuredData.logoImageUrl}
              className="w-[40vw] w-full max-w-[540px]"
            />
          </div>
          <div className="flex justify-between gap-4 px-4">
            <Button
              url={`/media/${featuredData.slug}`}
              text="Get Info"
              iconClass="fa-solid fa-info"
              tertiary
            />
            <Button url={tertiaryLink} text={tertiaryText} imgUrl={tertiaryLogo} tertiary />
          </div>
        </div>
      </div>
    </div>
  );
}
