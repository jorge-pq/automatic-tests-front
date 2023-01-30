import AutomaticTestsContainer from '../../containers/AutomaticTestsContainer';
import Layout from '../../layout';
import { getApps } from '../../services/app.service';
import { getTest, getAllTests } from '../../services/test.service';

const Home = ({ apps, test }) => {
    return (
        <Layout>
            <AutomaticTestsContainer apps={apps} test={test} />
        </Layout>
    );

}

export async function getStaticProps(context) {

    const apps = await getApps();
    const test = await getTest(context.params.id)

    return {
        props: {
            apps: apps,
            test: test
        },
        revalidate: 60,
    }

}

export async function getStaticPaths() {

    const tests = await getAllTests();

    const paths = tests.map((t) => ({
        params: { id: t._id },
    }))

    return { paths, fallback: 'blocking' }
}


export default Home;
