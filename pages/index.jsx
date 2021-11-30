import * as React from 'react';
import HotelsContainer from '../src/containers/HotelsContainer';
import { getHotels } from '../src/services/hotels.service';


const Index = ({ data }) => {
  return (
    <>
      <HotelsContainer data={data} />
    </>
  );

}
export async function getServerSideProps(ctx) {

  const data = await getHotels();
  return { props: { data } }

}


export default Index;
