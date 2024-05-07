import { useSelector } from 'react-redux';
import { getAllDrivers } from '../../Redux/Drivers/selectors';
import moment from 'moment';

import { ListWrapper, List } from './DashboardList.styled';
import { DashboardItem } from './DashboardItem/DashboardItem';

export const DashboardList = () => {
  const allDrivers = useSelector(getAllDrivers);

  const currentTime = moment();
  const sortedDrivers = [...allDrivers];
  sortedDrivers.sort((a, b) => {
    const timeA = moment(a.time, 'HH:mm');
    const timeB = moment(b.time, 'HH:mm');

    const dateA = moment(a.date, 'DD.MM');
    const dateB = moment(b.date, 'DD.MM');

    const diffTimeA = Math.abs(currentTime.diff(timeA, 'minutes'));
    const diffTimeB = Math.abs(currentTime.diff(timeB, 'minutes'));

    const diffDateA = Math.abs(currentTime.diff(dateA, 'days'));
    const diffDateB = Math.abs(currentTime.diff(dateB, 'days'));

    return diffTimeA + diffDateA - (diffTimeB + diffDateB);
  });

  return (
    <ListWrapper>
      <List>
        {sortedDrivers.map((driver) => {
          return <DashboardItem driver={driver} key={driver._id} />;
        })}
      </List>
    </ListWrapper>
  );
};
