import { useRouter } from "next/router";
import { useCallback } from "react";
import classes from "./style.module.scss";

function Pagination({ currentPage, totalPages }) {
  const router = useRouter();

  const handleOnClick = useCallback(
    (e) => {
      if (!e.target?.dataset?.page) return;
      router.push({ ...router, query: { ...router.query, page: e.target.dataset.page } });
    },
    [router]
  );

  return (
    totalPages > 1 && (
      <div className={classes.pagination} onClick={handleOnClick}>
        {currentPage > 1 && (
          <span className={classes.prev} data-page={currentPage - 1}>
            prev
          </span>
        )}

        {currentPage > 1 && (
          <span className={classes.page} data-page="1">
            1
          </span>
        )}
        {currentPage > 2 && (
          <span className={classes.page} data-page="2">
            2
          </span>
        )}

        {currentPage > 3 && currentPage <= 5 && currentPage != 3 && (
          <span className={classes.page} data-page="3">
            3
          </span>
        )}
        {currentPage > 4 && currentPage <= 5 && currentPage != 3 && (
          <span className={classes.page} data-page="4">
            4
          </span>
        )}

        {currentPage > 5 && <span>...</span>}
        {currentPage > 5 && currentPage != 3 && (
          <span className={classes.page} data-page={currentPage - 2}>
            {currentPage - 2}
          </span>
        )}
        {currentPage > 5 && currentPage != 3 && (
          <span className={classes.page} data-page={currentPage - 1}>
            {currentPage - 1}
          </span>
        )}

        <span className={`${classes.page} ${classes.currentPage}`}>{currentPage}</span>

        {totalPages > currentPage + 1 && (
          <span className={classes.page} data-page={currentPage + 1}>
            {currentPage + 1}
          </span>
        )}
        {totalPages > currentPage + 2 && (
          <span className={classes.page} data-page={currentPage + 2}>
            {currentPage + 2}
          </span>
        )}

        {currentPage < totalPages - 4 && <span>...</span>}

        {currentPage < totalPages - 3 && (
          <span className={classes.page} data-page={totalPages}>
            {totalPages - 1}
          </span>
        )}

        {currentPage < totalPages && (
          <span className={classes.page} data-page={totalPages}>
            {totalPages}
          </span>
        )}

        {currentPage != totalPages && (
          <span className={classes.next} data-page={currentPage + 1}>
            next
          </span>
        )}
      </div>
    )
  );
}

export default Pagination;
