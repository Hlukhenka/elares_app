import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Auth/authThunks';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log();

    dispatch(
      login({
        name: form.elements.name.value,
        surname: form.elements.surname.value,
        password: form.elements.password.value,
      })
    );
    form.reset();

  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="name" />
        <input type="text" name="surname" />
        <input type="text" name="password" />
        <button type="submit">Вхід</button>
      </form>
    </div>
  );
};
