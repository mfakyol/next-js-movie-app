import Cast from "./Cast";
import MovieDetailBanner from "./MovieDetailBanner";
import classes from "./style.module.scss";

function MovieDetailView({ detail }) {


  return (
    <div className={classes.movieDetailView}>
      <MovieDetailBanner detail={detail}/>
      <div className={classes.content}>
        <div className={classes.leftContent}>
          {detail.credits?.cast?.length > 0 && <Cast castList={detail.credits.cast}/>}
        </div>
        <div className={classes.rightContent}>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetailView;
