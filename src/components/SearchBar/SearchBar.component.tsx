import { useState, useEffect } from 'react';
import { SearchResult } from '../../types';
import './SearchBar.component.scss';

type SearchBarProps = {
  results: SearchResult[]
}

export const SearchBar = (props: SearchBarProps) => {
  const { results } = props;
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ showResults, setShowResults ] = useState(false);

  const hideResults = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest?.('.searchbar')) {
      setShowResults(false);
    }
  }

  const getName = (media: SearchResult) => {
    let name = media.name;
    if (media.season) {
      name += ` - Season ${media.season}`
    }

    return name;
  }

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.addEventListener('click', hideResults, true);

    return () => html.removeEventListener('click', hideResults, true);
  }, [])

  const matches = results.filter((term: SearchResult) => {
    return !!searchTerm && term?.name?.toLowerCase()?.includes(searchTerm);
  });

  return (
    <div className="searchbar">
      <div className="searchbar-field">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="search"
          className="searchbar-input"
          placeholder="Search the MCU"
          aria-label="Search the MCU"
          onChange={(ele) => setSearchTerm(ele?.target?.value?.toLowerCase())}
          onFocus={() => setShowResults(true)}
        />
      </div>
      {showResults && !!searchTerm && (
        <div className="searchbar-results">
          {matches.length === 0 && <div className="searchbar-empty">No titles found.</div>}
          <ul className="searchbar-results-list">
            {matches.map(result => {
              return (
                <li
                  className="result-selection"
                  key={result._id}
                  onClick={() => window.location.href = `/media/${result.slug}`}
                >
                  <img className="result-poster" src={result.poster} alt="" loading="lazy" />
                  <span>
                    <span className="result-name">{getName(result)}</span>
                    <span className="result-type">{result.type}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
