import { getUserName, getUserSurname } from '../../Redux/Auth/selectors';
import { logOut } from '../../Redux/Auth/authThunks';
import { useSelector, useDispatch } from 'react-redux';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const userSurname = useSelector(getUserSurname);

  return (
    <UserMenu>
      <p>
        Здарова, {userName} {userSurname}
      </p>

      <button onClick={() => dispatch(logOut())}>Вихід</button>
    </UserMenu>
  );
};
