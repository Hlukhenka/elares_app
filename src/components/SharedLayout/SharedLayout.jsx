import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '../Container/Container';
import { AppBar } from '../AppBar/AppBar';

const SharedLayout = () => {
  return (
    <>
      <AppBar />
      <Container>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default SharedLayout;
