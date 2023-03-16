import AutomaticTestsContainer from '../containers/AutomaticTestsContainer';
import Layout from '../layout';
import {getApps} from '../services/app.service';

const Home = ({apps}) => {

  return (
    <Layout>
      <AutomaticTestsContainer apps={apps} />
    </Layout>
  );

}

export async function getStaticProps(context) {

  const apps = await getApps();

  return {
      props: {
        apps: apps
      },
  }

}


export default Home;
