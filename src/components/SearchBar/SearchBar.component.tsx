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

  const hideResults = (e:any) => {
    const ignoreClasses = ['result-selection', 'searchbar-input']
    const targetClassName = e.target.className;

    const checkClassName = (target: string) => target === targetClassName

    if (!ignoreClasses.some(checkClassName)) {
      setShowResults(false);
    }
  }

  useEffect(() => {
    document.getElementsByTagName('html')[0].addEventListener('click', hideResults, true);

    return () => document.getElementsByTagName('body')[0].removeEventListener('click', hideResults, true);
  }, [])  

  return (
    <div className="searchbar">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="search"
        className="searchbar-input"
        onChange={(ele) => setSearchTerm(ele?.target?.value?.toLowerCase())}
        onFocus={() => setShowResults(true)}
      />
      <div className="searchbar-results">
        <ul className="searchbar-results-list">
          {
            showResults && results.length > 0 && (
              results.filter((term: SearchResult) => {
                const searchResult = term?.name?.toLowerCase();
                const searchInput = searchTerm;

                return !!searchInput && searchResult?.includes(searchInput);
              }).map(result => {
                return(
                  <li
                    className='result-selection'
                    key={result.name}
                    onClick={() => window.location.href = `/media/${result.slug}`}
                  >
                    {result.name}
                  </li>
                )
              })
            )
          }
        </ul>
      </div>
    </div>
  )
}