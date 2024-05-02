import { useDispatch } from 'react-redux';
import { register } from '../../Redux/Auth/authThunks';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    console.log(form.elements.name.value);

    dispatch(
      register({
        name: form.elements.name.value,
        surname: form.elements.surname.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="surname" placeholder="surname" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Реєстрація</button>
      </form>
    </div>
  );
};
