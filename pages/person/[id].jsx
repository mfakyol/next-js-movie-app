import http from "@services/httpService";
import PersonView from "@views/PersonView";
import Head from "next/head";
const ONE_DAY = 60 * 60 * 24;

function Person({ person }) {
  return (
    <>
      <Head>
        <title>{`${person.name} | Movie App`}</title>
      </Head>
      <PersonView person={person} />
    </>
  );
}

export default Person;

export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  try {
    const id = context.params.id.split("-")[0];
    const person = await http.get(`/person/${id}?language=${context.locale}&append_to_response=credits`);

    return {
      props: { person },
      revalidate: ONE_DAY,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
