import slug from "lib/slug";
import Link from "next/link";
import http from "@services/httpService";
import classes from "./style.module.scss";
import Router, { useRouter } from "next/router";
import useOnClickOutside from "@hooks/useOnClickOutside";
import useTranslation from "contexts/translationContext";
import { useCallback, useEffect, useRef, useState } from "react";

function Search({ className = "" }) {
  const t = useTranslation();

  const router = useRouter();
  const timeoutRef = useRef();
  const searchInputRef = useRef();
  const searchButtonRef = useRef();
  const searchWrapperRef = useRef();
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useOnClickOutside(searchWrapperRef, () => setShowResults(false));

  const search = useCallback(
    (query = "") => {
      if (query.length == 0) return;
      http.get(`/search/movie?query=${query}&language=${router.locale}`).then((res) => {
        setResults(res.results.slice(0, 8));
        setShowResults(true);
      });
    },
    [router.locale]
  );

  const handleOnKeyUp = useCallback((e) => {
    if (e.keyCode == 13) searchButtonRef.current.click();
  }, []);

  const handleOnChange = useCallback(
    (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        search(e.target.value);
        clearTimeout(timeoutRef.current);
      }, 500);
    },
    [search]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleOnClick = useCallback(() => {
    if (!searchInputRef.current.value) return;
    Router.push(`/search?query=${searchInputRef.current.value}`);
  }, []);

  return (
    <div ref={searchWrapperRef} className={`${classes.searchWrapper} ${className}`}>
      <input
        ref={searchInputRef}
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
        className={classes.searchInput}
        placeholder={t("search_movie").toCapitalCase()}
        onFocus={() => setShowResults(true)}
      />
      <button ref={searchButtonRef} onClick={handleOnClick} className={classes.searchButton}>
        {t("search").toCapitalCase()}
      </button>

      {showResults && (
        <div className={classes.results}>
          {results.map((result) => (
            <Link
              href={`/movie/${result.id}-${slug(result.original_title)}`}
              key={result.id}
              className={classes.result}
            >
              <div className={classes.title}>{result.title} </div>
              <div className={classes.detail}>
                <span className={classes.score}>{(result.vote_average * 10).toFixed(0)}%</span>
                <span className={classes.releaseDate}>{result.release_date?.slice(0, 4)}</span>

                {result.title != result.original_title && (
                  <span className={classes.originalTitle}>{`- ${result.original_title}`}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
