import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LoginContainer = dynamic(() => import('../containers/LoginContainer'), {
  suspense: true,
})

const login = () => {
  return (
    <Suspense fallback="loading...">
      <LoginContainer /> 
    </Suspense>
  );
};

export default login;