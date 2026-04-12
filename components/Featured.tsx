import Button from './Button'

const featuredData = {
  logoImageUrl: '/images/logos/braveNewWorld.webp',
  showTitle: 'Captain America: Brave New World',
  slug: 'captain-america-brave-new-world',
  watchUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y&ab_channel=MarvelEntertainment',
  watchIconUrl: '/images/logos/youtube.png',
  ticketsUrl: 'https://www.fandango.com/captain-america-brave-new-world-2025-237015/movie-overview',
  ticketsLogo: '/images/logos/fandango.webp',
}

const tertiaryText = featuredData.ticketsUrl ? 'Buy Tickets' : 'Watch Trailer'
const tertiaryLink = featuredData.ticketsUrl ?? featuredData.watchUrl
const tertiaryLogo = featuredData.ticketsLogo ?? featuredData.watchIconUrl

export default function Featured() {
  return (
    <div
      className="box-border w-full h-auto pl-32 pr-8 pb-0 relative shadow-[1px_1px_20px] z-[1] bg-[#578698]"
      style={{
        backgroundImage: 'url(/images/show-thumbnails/braveNewWorldThumbnail.png)',
        backgroundRepeat: 'no-repeat',
        aspectRatio: '3/1',
        backgroundSize: '50%',
        backgroundPosition: 'right',
      }}
    >
      <div className="absolute top-[8vw] max-w-[440px] w-full max-md:max-w-full max-md:flex max-md:flex-col max-md:justify-evenly max-[480px]:p-4">
        <div className="max-w-[540px]">
          <div className="mb-10 max-md:mb-4">
            <img
              alt={featuredData.showTitle}
              src={featuredData.logoImageUrl}
              className="w-full max-w-[540px] w-[40vw]"
            />
          </div>
          <div className="flex max-md:flex-col max-md:max-w-full">
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
  )
}
