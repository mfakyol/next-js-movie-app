import Head from "next/head";
import HomeView from "@views/HomeView";
import http from "@services/httpService";
import useTranslation from "contexts/translationContext";

const ONE_DAY = 60 * 60 * 24;

function Home({ popularMovies, trendingMovies, upcomingMovies }) {

  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t("home").toCapitalCase()} | Movie App`}</title>
      </Head>
      <HomeView popularMovies={popularMovies} trendingMovies={trendingMovies} upcomingMovies={upcomingMovies} />
    </>
  );
}

export default Home;

export async function getStaticProps(ctx) {
  try {
    const popularMoviesData = await http.get(`/movie/popular?language=${ctx.locale}`);
    const upcomingMoviesData = await http.get(`/movie/upcoming?language=${ctx.locale}`);
    const trendingMoviesData = await http.get(`/trending/movie/week?language=${ctx.locale}`);

    const popularMovies = popularMoviesData.results;
    const upcomingMovies = upcomingMoviesData.results;
    const trendingMovies = trendingMoviesData.results;

    return {
      props: { popularMovies, upcomingMovies, trendingMovies },
      revalidate: ONE_DAY,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
