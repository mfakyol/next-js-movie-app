import useTranslation from "contexts/translationContext";
import classes from "./style.module.scss";

function Banner({ detail }) {
  const t = useTranslation();

  const backgroundImage = `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${detail.backdrop_path}")`;

  return (
    <section style={{ backgroundImage }} className={classes.MovieDetailBanner}>
      <div className={classes.detailBody}>
        <div className={classes.posterWrapper}>
          <img
            className={classes.poster}
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${detail.poster_path}`}
            alt={detail.title}
            loading="lazy"
          />
        </div>
        <div className={classes.detailContent}>
          <h1 className={classes.title}>{detail.title}</h1>
          {detail.release_date && <span className={classes.releaseDate}>{detail.release_date}</span>}

          <div className={classes.score}>
            <span className={classes.scoreText}>{(detail.vote_average * 10).toFixed(0)}%</span>{" "}
            <span className={classes.scoreLabel}>{t("user_score").toCapitalCase()}</span>
          </div>

          {detail.overview && (
            <div className={classes.overview}>
              <span className={classes.overviewTitle}>{t("overview").toCapitalCase()}</span>
              <p className={classes.overviewText}>{detail.overview}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Banner;
