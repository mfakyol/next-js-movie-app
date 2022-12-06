import classes from "./style.module.scss";
import useTranslation from "contexts/translationContext";
import Link from "next/link";
import slug from "lib/slug";
import Slider from "_components/Slider";

function PersonView({ person }) {
  const t = useTranslation();

  return (
    <div className={classes.personView}>
      <div className={classes.left}>
        <img
          className={classes.profilePhoto}
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person.profile_path}`}
          alt=""
        />
        <div className={classes.personelInfo}>
          {person.known_for_department && (
            <>
              <div className={classes.title}>{t("known_for")}</div>
              <p className={classes.info}>{person.known_for_department}</p>
            </>
          )}

          {(person.credits.cast.length > 0 || person.credits.crew.length > 0) && (
            <>
              <div className={classes.title}>{t("known_credit")}</div>
              <p className={classes.info}>{person.credits.cast.length + person.credits.crew.length}</p>
            </>
          )}

          {person.gender != undefined && (
            <>
              <div className={classes.title}>{t("gender")}</div>
              <p className={classes.info}>{t(`gender-${person.gender}`).toCapitalCase()}</p>
            </>
          )}

          {person.birthday && (
            <>
              <div className={classes.title}>{t("birthday")}</div>
              <p className={classes.info}>{person.birthday}</p>
            </>
          )}

          {person.place_of_birth && (
            <>
              <div className={classes.title}>{t("place_of_birth")}</div>
              <p className={classes.info}>{person.place_of_birth}</p>
            </>
          )}

          {person.deathday && (
            <>
              <div className={classes.title}>{t("deathday")}</div>
              <p className={classes.info}>{person.deathday}</p>
            </>
          )}
        </div>
      </div>
      <div className={classes.right}>
        <h1 className={classes.title}>{person.name}</h1>

        {person.biography && (
          <>
            <h3 className={classes.biographyTitle}>{t("biography")}</h3>
            <p className={classes.biography}>{person.biography}</p>
          </>
        )}

        <Slider title={t("known_for")}>
          {[...person.credits.cast, ...person.credits.crew].map((cast, index) => (
            <Link href={`/movie/${cast.id}-${slug(cast.title)}`} key={`${cast.id}-${index}`} className={classes.item}>
              <img
                className={classes.poster}
                src={`https://www.themoviedb.org/t/p/w150_and_h225_face${cast.poster_path}`}
                alt={cast.name}
                loading="lazy"
              />
              <p className={classes.role}>{cast.job || cast.character}</p>
              <p className={classes.name}>{cast.title}</p>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default PersonView;
