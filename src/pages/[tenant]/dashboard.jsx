import * as React from 'react';
import Layout from '../../layout';
import DashboardContainer from '../../containers/DashboardContainer';


const dashboard = () => {
  return (
    <Layout page={'Dashboard'}>
      <DashboardContainer />
    </Layout>
  );

}

export default dashboard;
