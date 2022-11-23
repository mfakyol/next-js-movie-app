import useTranslation from "contexts/translationContext";
import slug from "lib/slug";
import Link from "next/link";
import Search from "_components/Search";
import Slider from "_components/Slider";
import classes from "./style.module.scss";

function HomeView({ popularMovies, trendingMovies, upcomingMovies }) {
  const t = useTranslation();

  return (
    <main className={classes.homeView}>
      <div className={classes.heroes}>
        <div className={classes.heroesContent}>
          <h2 className={classes.welcome}>{t("welcome")},</h2>
          <h3 className={classes.slogan}>{t("slogan")}</h3>
          <Search />
        </div>
      </div>

      <section className={classes.section}>
        <Slider title={t("popular")}>
          {popularMovies.map((popularMovie) => (
            <SliderItemContent key={popularMovie.id} item={popularMovie} />
          ))}
        </Slider>

        <Slider title={t("coming_soon")}>
          {upcomingMovies.map((upcomingMovie) => (
            <SliderItemContent key={upcomingMovie.id} item={upcomingMovie} />
          ))}
        </Slider>

        <Slider title={t("weakly_trending")}>
          {trendingMovies.map((trendingMovie) => (
            <SliderItemContent key={trendingMovie.id} item={trendingMovie} />
          ))}
        </Slider>
      </section>
    </main>
  );
}

export default HomeView;

const SliderItemContent = ({ item }) => {
  return (
    <Link key={item.id} href={`/movie/${item.id}-${slug(item.original_title)}`} className={classes.sliderItemContent}>
      <p className={classes.score}>{(item.vote_average * 10).toFixed(0)}%</p>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
        alt=""
        loading="lazy"
      />
      <p className={classes.title}>{item.title}</p>
      <p className={classes.releaseDate}>{item.release_date}</p>
    </Link>
  );
};
