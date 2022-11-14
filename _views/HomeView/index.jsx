import Slider from "_components/Slider";
import classes from "./style.module.scss";

function HomeView({ popularMovies, trendingMovies, upcomingMovies }) {
  console.log(trendingMovies);
  return (
    <main className={classes.homeView}>
      <div className={classes.heroes}>
        <div className={classes.heroesOverlay}></div>
        <div className={classes.heroesContent}>
          <h2 className={classes.welcome}>Hoşgeldin,</h2>
          <h3 className={classes.slogan}>Milyonlarca filmi, Şimdi keşfedin.</h3>
          <input className={classes.searchInput} placeholder="Search Film..." />
        </div>
      </div>

      <section className={classes.section}>
        <Slider title="Popular" items={popularMovies} />
        <Slider title="Coming Soon" items={upcomingMovies} />
        <Slider title="Weakly Trending" items={trendingMovies} />
      </section>
    </main>
  );
}

export default HomeView;