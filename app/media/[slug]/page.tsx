import type { Metadata } from 'next'
import { fetchApi } from '@/lib/api'
import { Media } from '@/types'
import MediaRow from '@/components/MediaRow'
import Button from '@/components/Button'
import HasWatched from '@/components/HasWatched'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const media: Media = await fetchApi(`/media/${slug}`)
  return { title: `${media?.name ?? 'Media'} | TheMCU.FYI` }
}

export default async function MediaInfoPage({ params }: Props) {
  const { slug } = await params
  const [media, relatedMedia]: [Media, Media[]] = await Promise.all([
    fetchApi(`/media/${slug}`),
    fetchApi(`/media/${slug}/related`),
  ])

  const releaseDate = new Date(media?.releaseDate ?? 0)
  const releaseYear = releaseDate.getFullYear()
  const isFuture = Date.now() - (media?.releaseDate ?? 0) < 0

  const getName = () => {
    let name = media?.name ?? ''
    if (media?.season) name += ` - Season ${media.season}`
    return name
  }

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL ?? ''

  return (
    <div className="px-8 flex text-white max-w-content mx-auto mt-8 box-border max-md:flex-col max-md:mt-4 max-md:w-full">
      {/* Left column — poster */}
      <div className="w-[250px] mr-6 relative max-md:mx-auto max-md:text-center">
        <img
          className="w-[250px] rounded mb-4"
          alt={`poster of ${getName()}`}
          title={getName()}
          src={media?.poster}
        />
        {/* Mobile title */}
        <div className="md:hidden">
          <h1 className="text-[36px] inline">{getName()}</h1>
          <span className="inline-block text-[2em] mx-2">|</span>
          <span className="font-bold text-base">{releaseYear}</span>
        </div>

        {!isFuture && <HasWatched slug={media?.slug ?? ''} name={getName()} />}

        {/* Desktop buttons */}
        <div className="hidden md:flex flex-col">
          {media?.playLink && (
            <Button
              url={media.playLink}
              text="Watch Now"
              imgUrl={`${clientUrl}/images/logos/DisneyPlus.png`}
            />
          )}
          {media?.trailerLink && (
            <Button url={media.trailerLink} text="Watch Trailer" secondary textOnly />
          )}
        </div>
      </div>

      {/* Mobile buttons */}
      <div className="flex md:hidden">
        {media?.playLink && (
          <Button
            url={media.playLink}
            text="Watch Now"
            imgUrl={`${clientUrl}/images/logos/DisneyPlus.png`}
          />
        )}
        {media?.trailerLink && (
          <Button url={media.trailerLink} text="Watch Trailer" secondary textOnly />
        )}
      </div>

      {/* Right column — details */}
      <div className="flex flex-col w-[calc(100%-250px)] max-md:w-full">
        <h1 className="text-[36px] hidden md:block">{getName()}</h1>
        <div className="font-bold mb-12 hidden md:block">
          <span>{releaseYear}</span>
          {media?.duration && (
            <span className="before:content-['|'] before:px-2">{media.duration}</span>
          )}
        </div>

        <div className="mt-[42px]">
          <strong className="font-bold w-full border-b-2 border-white/10 uppercase pb-4 mb-4 block">
            <span className="border-b-2 border-mcu-red/70 pb-4">Synopsis</span>
          </strong>
          <p className="p-0 m-0 text-xl leading-relaxed w-full">{media?.description}</p>
        </div>

        {relatedMedia.length > 0 && (
          <div className="mt-[42px]">
            <strong className="font-bold w-full border-b-2 border-white/10 uppercase pb-4 mb-4 block">
              <span className="border-b-2 border-mcu-red/70 pb-4">What to watch first:</span>
            </strong>
            <MediaRow mediaList={relatedMedia} />
          </div>
        )}
      </div>
    </div>
  )
}
