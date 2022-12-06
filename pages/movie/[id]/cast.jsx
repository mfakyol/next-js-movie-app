import http from "@services/httpService";
import CastView from "@views/CastView";
import useTranslation from "contexts/translationContext";
import Head from "next/head";

const ONE_DAY = 60 * 60 * 24;

function Cast(props) {
  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{`${props.title} | ${t("cast_and_crew").toCapitalCase()} | Movie App`}</title>
      </Head>
      <CastView {...props} />
    </>
  );
}
export default Cast;

export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  try {
    const id = context.params.id.split("-")[0];
    const response = await http.get(`/movie/${id}?language=${context.locale}&append_to_response=credits`);

    const { poster_path, backdrop_path, title, credits, release_date } = response;

    return {
      props: { title, poster_path, backdrop_path, release_date, crew: credits },
      revalidate: ONE_DAY,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
