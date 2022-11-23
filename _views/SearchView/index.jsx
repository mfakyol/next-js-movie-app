import http from "@services/httpService";
import slug from "lib/slug";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "_components/Pagination";
import Search from "_components/Search";
import classes from "./style.module.scss";

function SearchView() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.query) return;
    http
      .get(`/search/movie?query=${router.query.query}&language=${router.locale}&page=${router.query.page || 1}`)
      .then((res) => {
        setResults(res.results);
        setCurrentPage(res.page || 1);
        setTotalPages(res.total_pages || 1);
      });
  }, [router]);

  return (
    <div className={classes.searchView}>
      <Search className={classes.search} />
      <div className={classes.results}>
        {results.map((result) => (
          <Link href={`/movie/${result.id}-${slug(result.original_title)}`} key={result.id} className={classes.result}>
            <img
              className={classes.poster}
              src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${result.poster_path}`}
              alt={result.title}
              loading="lazy"
            />
            <div className={classes.resultInfo}>
              <p className={classes.title}>{result.title}</p>
              <div className={classes.row}>
                <p className={classes.date}>{result.release_date?.slice(0, 4)}</p>
                {result.title != result.original_title && (
                  <p className={classes.originalTitle}>{result.original_title}</p>
                )}
              </div>
              <p className={classes.overview}>{result.overview}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default SearchView;
