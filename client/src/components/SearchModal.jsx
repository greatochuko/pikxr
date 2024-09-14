import { useEffect, useState } from "react";
import { searchUsers } from "../services/searchServices";

import propTypes from "prop-types";

import styles from "../styles/SearchModal.module.css";
import SearchResult from "./SearchResult";
import SearchResultWireFrame from "./SearchResultWireFrame";

export default function SearchModal({ closeModalContainer }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function search() {
      setIsLoading(true);
      try {
        const data = await searchUsers(query, signal);
        setSearchResults(data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!query) {
      setSearchResults([]);
      return;
    }
    search();
    return () => controller.abort();
  }, [query]);

  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </form>
      <ul className={styles.searchResults}>
        {isLoading ? (
          <>
            <SearchResultWireFrame />
            <SearchResultWireFrame />
            <SearchResultWireFrame />
          </>
        ) : (
          searchResults.map((result) => (
            <SearchResult
              key={result._id}
              result={result}
              closeModalContainer={closeModalContainer}
            />
          ))
        )}
      </ul>
    </div>
  );
}

SearchModal.propTypes = {
  closeModalContainer: propTypes.func,
};
