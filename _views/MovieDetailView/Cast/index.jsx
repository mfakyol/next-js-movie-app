import useTranslation from "contexts/translationContext";
import slug from "lib/slug";
import Link from "next/link";
import { useRouter } from "next/router";
import Slider from "@components/Slider";
import classes from "./style.module.scss";

function Cast({ castList }) {
  const router = useRouter();
  const t = useTranslation();
  
  const handleOnError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/person.jpg";
  };

  return (
    <div className={classes.cast}>
      <Slider title={t("cast")} seeAllLink={`${router.asPath}/cast`}>
        {castList.slice(0, 20).map((cast) => (
          <Link href={`/person/${cast.id}-${slug(cast.name)}`}  key={cast.id} className={classes.item}>
            <img
              className={classes.photo}
              src={`https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`}
              alt={cast.name}
              loading="lazy"
              onError={handleOnError}
            />
            <p className={classes.name}>{cast.name}</p>
            <p className={classes.character}>{cast.character}</p>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default Cast;
