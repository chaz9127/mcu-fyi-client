'use client'

import Link from 'next/link'
import { Media as MediaType } from '@/types'
import HasWatched from './HasWatched'
import { Tooltip } from 'react-tooltip'

type MediaProps = {
  media: MediaType
}

export default function Media({ media }: MediaProps) {
  const { name, slug, poster, season, type, releaseDate } = media
  const isFuture = Date.now() - releaseDate < 0

  return (
    <div title={name} className="relative rounded overflow-hidden group">
      <Link
        href={`/media/${slug}`}
        className="flex flex-col text-white no-underline max-w-[200px] visited:text-white max-[480px]:max-w-[160px]"
      >
        <img
          alt={`${name} poster`}
          className="w-[200px] max-[480px]:w-[160px]"
          style={{ aspectRatio: '27/40' }}
          src={poster}
        />
        <span className="mt-2.5 font-bold truncate whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </span>
        <div className="flex justify-between h-6 leading-5 text-white/50 mt-2 text-xs">
          <span className="border-2 border-white/50 rounded-[5px] px-[3px]">
            {type || 'Movie'}
          </span>
          <span className="text-base">{season ? `Season ${season}` : ''}</span>
        </div>
      </Link>
      {/* Hover inner shadow overlay */}
      <div className="absolute top-0 left-0 w-full h-[calc(100%-63px)] pointer-events-none group-hover:shadow-[inset_0_0_16px_black]" />
      {!isFuture && <HasWatched slug={slug} name={name} />}
      <Tooltip id={`${slug}-watched-icon`} />
    </div>
  )
}
