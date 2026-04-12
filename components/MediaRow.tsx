'use client'

import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { Media as MediaType } from '@/types'
import Media from './Media'
import { LeftArrow, RightArrow } from './CarouselArrows'

type MediaRowProps = {
  mediaList: MediaType[]
  title?: string
}

export default function MediaRow({ mediaList, title = '' }: MediaRowProps) {
  return (
    <div className="relative">
      {title && <h2 className="font-bold truncate text-white">{title}</h2>}
      <div>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {mediaList.map((media, idx) => (
            <div key={idx} className="mr-4">
              <Media media={media} />
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  )
}
