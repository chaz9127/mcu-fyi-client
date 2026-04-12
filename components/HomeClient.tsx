'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAuth } from '@/lib/auth-context'
import { Media as MediaType } from '@/types'
import Media from './Media'

type HomeClientProps = {
  initialMedia: MediaType[]
}

export default function HomeClient({ initialMedia }: HomeClientProps) {
  const { currentUser } = useAuth()
  const hasUser = !!(currentUser && Object.keys(currentUser).length > 0)
  const searchParams = useSearchParams()
  const router = useRouter()

  const [sortByValue, setSortByValue] = useState<string>('releaseDate')
  const [filterByValue, setFilterByValue] = useState<string>('all')

  // Handle toast notifications via query params
  useEffect(() => {
    const toastParam = searchParams.get('toast')
    const submittedFeedback = searchParams.get('submittedFeedback')

    if (toastParam === 'login') {
      toast('Welcome back!')
      router.replace('/')
    } else if (toastParam === 'register') {
      toast('Welcome!')
      router.replace('/')
    } else if (toastParam === 'logout') {
      toast('Successfully logged out.')
      router.replace('/')
    } else if (submittedFeedback) {
      toast('Thanks for the feedback!')
      router.replace('/')
    }
  }, [searchParams, router])

  const sortByCompare = (a: MediaType, b: MediaType) => {
    if (sortByValue === 'name') {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    }
    if (sortByValue === 'releaseDate' || sortByValue === 'chronologicalOrder') {
      return a[sortByValue] - b[sortByValue]
    }
    return 0
  }

  const displayMedia = [...initialMedia]
    .filter((item) => {
      if (filterByValue === 'watched') return currentUser?.watched?.includes(item.slug)
      if (filterByValue === 'unwatched') return !currentUser?.watched?.includes(item.slug)
      return true
    })
    .sort(sortByCompare)

  return (
    <div className="px-8 flex flex-wrap justify-between gap-5 max-md:px-0 max-md:w-full">
      {/* Filter / sort bar */}
      <div className="w-full flex gap-4 max-md:px-4 max-md:flex-col">
        <div className="flex items-center">
          <label className="text-white/80 inline-block mr-3">Sort By:</label>
          <select
            className="w-[150px] h-8 bg-white border border-[#caced1] rounded text-black cursor-pointer"
            onChange={(e) => setSortByValue(e.target.value)}
            value={sortByValue}
          >
            <option value="releaseDate">Release Date</option>
            <option value="chronologicalOrder">Chronologically</option>
            <option value="name">Title</option>
          </select>
        </div>

        {hasUser && (
          <div className="flex items-center max-md:mt-4">
            <label className="text-white/80 inline-block mr-3">Filter By:</label>
            <div className="inline-flex gap-4">
              {(['watched', 'unwatched', 'all'] as const).map((val) => (
                <label key={val} className="flex items-center gap-1 text-white cursor-pointer">
                  <input
                    type="radio"
                    name="filter-by"
                    value={val}
                    checked={filterByValue === val}
                    onChange={(e) => setFilterByValue(e.target.value)}
                  />
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Media grid */}
      {displayMedia.map((media, idx) => (
        <div key={idx}>
          <Media media={media} />
        </div>
      ))}
    </div>
  )
}
