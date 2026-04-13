import type { Metadata } from "next";
import { fetchApi } from "@/lib/api";
import { Media } from "@/types";
import MediaRow from "@/components/MediaRow";
import Button from "@/components/Button";
import HasWatched from "@/components/HasWatched";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const media: Media = await fetchApi(`/media/${slug}`);
  return { title: `${media?.name ?? "Media"} | TheMCU.FYI` };
}

export default async function MediaInfoPage({ params }: Props) {
  const { slug } = await params;
  const [media, relatedMedia]: [Media, Media[]] = await Promise.all([
    fetchApi(`/media/${slug}`),
    fetchApi(`/media/${slug}/related`),
  ]);

  const releaseDate = new Date(media?.releaseDate ?? 0);
  const releaseYear = releaseDate.getFullYear();
  const isFuture = Date.now() - (media?.releaseDate ?? 0) < 0;

  const getName = () => {
    let name = media?.name ?? "";
    if (media?.season) name += ` - Season ${media.season}`;
    return name;
  };

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL ?? "";

  return (
    <div className="mx-auto mt-8 box-border flex max-w-content px-8 max-md:mt-4 max-md:w-full max-md:flex-col">
      {/* Left column — poster */}
      <div className="relative mr-6 w-[250px] max-md:mx-auto max-md:text-center">
        <img
          className="mb-4 w-[250px] rounded"
          alt={`poster of ${getName()}`}
          title={getName()}
          src={media?.poster}
        />
        {/* Mobile title */}
        <div className="md:hidden">
          <h1 className="inline text-[36px]">{getName()}</h1>
          <span className="mx-2 inline-block text-[2em]">|</span>
          <span className="text-base font-bold">{releaseYear}</span>
        </div>

        {!isFuture && <HasWatched slug={media?.slug ?? ""} name={getName()} />}

        {/* Desktop buttons */}
        <div className="hidden flex-col md:flex">
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
      <div className="flex w-[calc(100%-250px)] flex-col max-md:w-full">
        <h1 className="hidden text-[36px] md:block">{getName()}</h1>
        <div className="mb-12 hidden font-bold md:block">
          <span>{releaseYear}</span>
          {media?.duration && (
            <span className="before:px-2 before:content-['|']">{media.duration}</span>
          )}
        </div>

        <div className="mt-[42px]">
          <strong className="mb-4 block w-full border-b-2 border-white/10 pb-4 font-bold uppercase">
            <span className="border-b-2 border-mcu-red/70 pb-4">Synopsis</span>
          </strong>
          <p className="m-0 w-full p-0 text-xl leading-relaxed">{media?.description}</p>
        </div>

        {relatedMedia.length > 0 && (
          <div className="mt-[42px]">
            <strong className="mb-4 block w-full border-b-2 border-white/10 pb-4 font-bold uppercase">
              <span className="border-b-2 border-mcu-red/70 pb-4">What to watch first:</span>
            </strong>
            <MediaRow mediaList={relatedMedia} />
          </div>
        )}
      </div>
    </div>
  );
}
