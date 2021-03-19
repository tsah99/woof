import React from "react";
import algoliasearch from "algoliasearch/lite";
import "./searchBar.css";
import { connectStateResults } from "react-instantsearch-dom";

import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";

//handle on search client
//TODO: probably want to make this information private later on
const searchClient = algoliasearch(
  "SVXVZO2ZW8",
  "9b17a4ec23a796d3bf7496e73fd930be"
);

//component renders search results
const Results = connectStateResults(({ searchState, searchResults }) =>
  searchState && searchState.query ? (
    <React.Fragment>
      <div className="SearchState">
        {searchResults ? searchResults.nbHits : 0} Results for
        {" " + searchState.query}
        {/* Results for {searchState.query} */}
      </div>
      <Hits hitComponent={Hit} />
    </React.Fragment>
  ) : (
    <div className="SearchState"></div>
  )
);

//renders highlight on substrings in search result
const Hit = ({ hit }) => (
  <Highlight attribute="text" hit={hit} tagName="mark" />
);

/**
 * Renders the SearchBar component used to search for comments on a video.
 * @param props an object that contains
 *    courseId - the id of the course
 *    videoId - the id of the video
 */
function SearchBar(props) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={
        "classes:" + props.courseId + ":videos:" + props.videoId + ":comments"
      }
    >
      <SearchBox />
      <Results></Results>
    </InstantSearch>
  );
}

export default SearchBar;
