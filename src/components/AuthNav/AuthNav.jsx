import { StyledLink } from './AuthNav.styled';

export const AuthNav = () => {
  return (
    <div>
      <StyledLink to="/register">Реєстрація</StyledLink>
      <StyledLink to="/login">Вхід</StyledLink>
    </div>
  );
};
