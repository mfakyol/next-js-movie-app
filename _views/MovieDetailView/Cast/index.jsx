import classes from "./style.module.scss";

function Cast({ castList }) {
  console.log(castList);
  return (
    <div className={classes.cast}>
      <p className={classes.title}>Cast</p>
      <div className={classes.sliderWrapper}>
      <div className={classes.slider}>
        {castList.slice(0, 20).map((cast) => (
          <div key={cast.id} className={classes.item}>
            <img className={classes.photo} src={`https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`} alt="" srcset="" />
            <p className={classes.name}>{cast.name}</p>
            <p className={classes.character}>{cast.character}</p>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
}

export default Cast;
