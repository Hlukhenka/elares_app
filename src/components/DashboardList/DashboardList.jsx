import { useSelector } from 'react-redux';
import { getAllDrivers } from '../../Redux/Drivers/selectors';

export const DashboardList = () => {
  const allDrivers = useSelector(getAllDrivers);

  return (
    <div>
      <ul>
        {allDrivers.map(({ name, surname, _id }) => {
          return (
            <li key={_id}>
              <span>{name} </span>
              <span> {surname}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
