import classes from "./style.module.scss";
import useTranslation from "contexts/translationContext";
import Link from "next/link";
import slug from "lib/slug";

function CastView(props) {
  const t = useTranslation();

  const handleOnError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/person.jpg";
  };

  return (
    <div className={classes.castView}>
      <div className={classes.banner}>
        <img
          className={classes.bannerBackgroundImage}
          src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.backdrop_path}`}
          alt={`${props.title} background-image`}
        />
        <div className={classes.content}>
          <img
            className={classes.poster}
            src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${props.poster_path}`}
            alt={`${props.title} poster`}
          />

          <h1 className={classes.title}>{`${props.title} ${t("cast_and_crew").toCapitalCase()}`}</h1>
        </div>
      </div>

      <div className={classes.crewContainer}>
        <div className={classes.crewListWrapper}>
          <h2 className={classes.subTitle}>
            {t("cast").toCapitalCase()} ({props.crew.cast.length})
          </h2>
          <ul className={classes.crewList}>
            {props.crew.cast.map((c) => (
              <li className={classes.crewItem} key={c.cast_id}>
                <Link className={classes.crewItemContent} href={`/person/${c.id}-${slug(c.name)}`} prefetch={false}>
                  <img
                    className={classes.crewImage}
                    src={`https://image.tmdb.org/t/p/w132_and_h132_face/${c.profile_path}`}
                    alt={`${c.name}`}
                    loading="lazy"
                    onError={handleOnError}
                  />
                  <div className={classes.crewInfo}>
                    <span className={classes.crewName}>{c.name}</span>
                    <span className={classes.crewJob}>{c.character}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.crewListWrapper}>
          <h2 className={classes.subTitle}>
            {t("crew").toCapitalCase()} ({props.crew.crew.length})
          </h2>
          <ul className={classes.crewList}>
            {props.crew.crew.map((c) => (
              <li className={classes.crewItem} key={c.credit_id}>
                <Link className={classes.crewItemContent} href={`/person/${c.id}-${slug(c.name)}`} prefetch={false}>
                  <img
                    className={classes.crewImage}
                    src={`https://image.tmdb.org/t/p/w132_and_h132_face/${c.profile_path}`}
                    alt={`${c.name}`}
                    loading="lazy"
                    onError={handleOnError}
                  />
                  <div className={classes.crewInfo}>
                    <span className={classes.crewName}>{c.name}</span>
                    <span className={classes.crewJob}>{c.job}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CastView;
