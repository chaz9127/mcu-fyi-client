import { fetchApi } from '@/lib/api'
import { Media } from '@/types'
import HomeClient from '@/components/HomeClient'
import Featured from '@/components/Featured'

export default async function HomePage() {
  const media: Media[] = await fetchApi('/media')

  return (
    <div className="font-noto">
      <Featured />
      <HomeClient initialMedia={media} />
    </div>
  )
}
