import useTranslation from "contexts/translationContext";
import Slider from "_components/Slider";
import classes from "./style.module.scss";

function Cast({ castList }) {

  const t = useTranslation();

  return (
    <div className={classes.cast}>
      <Slider title={t("cast")}>
        {castList.slice(0, 20).map((cast) => (
          <div key={cast.id} className={classes.item}>
            <img
              className={classes.photo}
              src={`https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`}
              alt={cast.name}
            />
            <p className={classes.name}>{cast.name}</p>
            <p className={classes.character}>{cast.character}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Cast;
