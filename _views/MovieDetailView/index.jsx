import numberSeperator from "lib/numberSeperator";
import Cast from "./Cast";
import Banner from "./Banner";
import Posters from "./Posters";
import classes from "./style.module.scss";
import Videos from "./Videos";
import useTranslation from "contexts/translationContext";

function MovieDetailView({ detail }) {
  const t = useTranslation();
 
  return (
    <div className={classes.movieDetailView}>
      <Banner detail={detail} />
      <div className={classes.content}>
        <div className={classes.leftContent}>
          {detail.credits?.cast?.length > 0 && <Cast castList={detail.credits.cast} />}

          {detail.videos?.results?.length > 0 && <Videos videos={detail.videos.results} />}
          {detail.images?.posters?.length > 0 && <Posters posters={detail.images?.posters} />}
        </div>
        <div className={classes.rightContent}>
          {detail.original_title != detail.title && (
            <div className={classes.info}>
              <p className={classes.infoLabel}> {t("original_title").toCapitalCase()}</p>
              <p className={classes.infoText}>{detail.original_title}</p>
            </div>
          )}

          {detail.status && (
            <div className={classes.info}>
              <p className={classes.infoLabel}>{t("status").toCapitalCase()}</p>
              <p className={classes.infoText}>{detail.status}</p>
            </div>
          )}

          {!!detail.budget && (
            <div className={classes.info}>
              <p className={classes.infoLabel}>{t("budget").toCapitalCase()}</p>
              <p className={classes.infoText}>{numberSeperator( detail.budget)}$</p>
            </div>
          )}
          {!!detail.revenue && (
            <div className={classes.info}>
              <p className={classes.infoLabel}>{t("revenue").toCapitalCase()}</p>
              <p className={classes.infoText}>{numberSeperator(detail.revenue)}$</p>
            </div>
          )}
          {detail.genres?.length > 0 && (
            <div className={classes.categoryWrapper}>
              <p className={classes.categoryLabel}> {t("genres").toCapitalCase()}</p>
              <ul className={classes.categories}>
                {detail.genres.map((genre) => (
                  <li key={genre.id} className={classes.category}>
                    {genre.name} 
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detail.keywords?.keywords?.length > 0 && (
            <div className={classes.categoryWrapper}>
              <p className={classes.categoryLabel}> {t("keywords").toCapitalCase()}</p>
              <ul className={classes.categories}>
                {detail.keywords.keywords.map((keyword) => (
                  <li key={keyword.id} className={classes.category}>
                    {keyword.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detail.spoken_languages?.length > 0 && (
            <div className={classes.categoryWrapper}>
              <p className={classes.categoryLabel}> {t("spoken_languages").toCapitalCase()} </p>
              <ul className={classes.categories}>
                {detail.spoken_languages.map((lang) => (
                  <li key={lang.iso_639_1} className={classes.category}>
                    {lang.english_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailView;
