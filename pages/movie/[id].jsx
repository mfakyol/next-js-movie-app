import http from "@services/httpService";
import MovieDetailView from "@views/MovieDetailView";
import Head from "next/head";
import React from "react";
const ONE_DAY = 60 * 60 * 24;

function MovieDetailPage({ detail }) {
  return (
    <>
      <Head>
        <title>{detail.title} | Movie App</title>
      </Head>
      <MovieDetailView detail={detail} />
    </>
  );
}

export default MovieDetailPage;

export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  try {
    const detailResponse = await http.get(`/movie/${context.params.id}?language=${context.locale}`);

    return {
      props: { detail: detailResponse },
      revalidate: ONE_DAY,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
