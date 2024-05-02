import { Nav } from './AppBar.styled';
import { Container } from '../Container/Container';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../Redux/Auth/selectors';
import { AuthNav } from '../AuthNav/AuthNav';
import { UserMenu } from '../UserMenu/UserMenu';

export const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <Container>
      <Nav>{isLoggedIn ? <UserMenu /> : <AuthNav />}</Nav>
    </Container>
  );
};
