'use client'

import { useState, useEffect } from 'react'
import { SearchResult } from '@/types'

type SearchBarProps = {
  results: SearchResult[]
}

export default function SearchBar({ results }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)

  const hideResults = (e: Event) => {
    const ignoreClasses = ['result-selection', 'searchbar-input']
    const target = (e.target as HTMLElement).className
    if (!ignoreClasses.some((c) => c === target)) {
      setShowResults(false)
    }
  }

  useEffect(() => {
    document.documentElement.addEventListener('click', hideResults, true)
    return () => document.documentElement.removeEventListener('click', hideResults, true)
  }, [])

  const getName = (media: SearchResult) => {
    let name = media.name
    if (media.season) name += ` - Season ${media.season}`
    return name
  }

  const filtered = results.filter((term) => {
    const searchResult = term?.name?.toLowerCase()
    return !!searchTerm && searchResult?.includes(searchTerm)
  })

  return (
    <div className="w-full max-w-[30em] h-[30px] border-2 border-[#393939] rounded-[5px] focus-within:border-white relative">
      <i className="fa-solid fa-magnifying-glass ml-4 text-white"></i>
      <input
        type="search"
        className="searchbar-input h-full w-[calc(100%-48px)] border-none bg-transparent outline-none text-white text-base font-bold"
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        onFocus={() => setShowResults(true)}
      />
      {showResults && filtered.length > 0 && (
        <div className="absolute bg-nav-bg w-full top-[40px] rounded z-[2]">
          <ul>
            {filtered.map((result) => (
              <li
                className="result-selection px-6 py-4 cursor-pointer font-bold hover:bg-hover-bg"
                key={result._id}
                onClick={() => (window.location.href = `/media/${result.slug}`)}
              >
                {getName(result)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
