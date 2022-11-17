import Cast from "./Cast";
import MovieDetailBanner from "./MovieDetailBanner";
import Posters from "./Posters";
import classes from "./style.module.scss";
import Videos from "./Videos";

function MovieDetailView({ detail }) {


  return (
    <div className={classes.movieDetailView}>
      <MovieDetailBanner detail={detail}/>
      <div className={classes.content}>
        <div className={classes.leftContent}>
          {detail.credits?.cast?.length > 0 && <Cast castList={detail.credits.cast}/>}

          {detail.videos?.results?.length > 0 && <Videos videos={detail.videos.results}/>}
          {detail.images?.posters?.length > 0 && <Posters posters={detail.images?.posters}/>}
        </div>
        <div className={classes.rightContent}>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetailView;
