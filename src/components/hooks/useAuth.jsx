import { useSelector } from 'react-redux';
import {
  getIsLoggedIn,
  selectIsRefreshing,
  getUserName,
} from '../../Redux/Auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(getUserName);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
