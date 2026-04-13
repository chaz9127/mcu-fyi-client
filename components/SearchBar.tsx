"use client";

import { useState, useEffect, useRef } from "react";
import { SearchResult } from "@/types";

type SearchBarProps = {
  results: SearchResult[];
};

export default function SearchBar({ results }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hideResults = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.documentElement.addEventListener("click", hideResults, true);
    return () => document.documentElement.removeEventListener("click", hideResults, true);
  }, []);

  const getName = (media: SearchResult) => {
    let name = media.name;
    if (media.season) name += ` - Season ${media.season}`;
    return name;
  };

  const filtered = results.filter((term) => {
    const searchResult = term?.name?.toLowerCase();
    return !!searchTerm && searchResult?.includes(searchTerm);
  });
  console.log("showResults = ", showResults);
  return (
    <div
      ref={containerRef}
      className="relative h-10 w-full max-w-[30em] rounded-[5px] border-2 border-[#393939] focus-within:border-white"
    >
      <i className="fa-solid fa-magnifying-glass ml-4"></i>
      <input
        type="search"
        placeholder="Whatcha wanna watch?"
        className="searchbar-input h-full w-[calc(100%-48px)] border-none bg-transparent ps-4 text-base font-bold outline-none"
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        onFocus={() => setShowResults(true)}
      />
      {showResults && filtered.length > 0 && (
        <div className="absolute top-[40px] z-[2] w-full rounded bg-nav-bg">
          <ul>
            {filtered.map((result) => (
              <li
                className="result-selection cursor-pointer px-6 py-4 font-bold hover:bg-hover-bg"
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
  );
}
