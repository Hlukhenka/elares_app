import { useSelector } from 'react-redux';
import { getAllDrivers } from '../../Redux/Drivers/selectors';
import moment from 'moment';
import { ListWrapper, List } from './DashboardList.styled';
import { DashboardItem } from './DashboardItem/DashboardItem';

export const DashboardList = () => {
  const allDrivers = useSelector(getAllDrivers);

  const currentTime = moment();
  const currentDate = moment().startOf('day');
  const sortedDrivers = [...allDrivers];

  sortedDrivers.sort((a, b) => {
    const timeA = moment(a.time, 'HH:mm');
    const timeB = moment(b.time, 'HH:mm');
    const dateA = moment(a.date, 'DD.MM');
    const dateB = moment(b.date, 'DD.MM');

    const isTodayA = dateA.isSame(currentDate, 'day');
    const isTodayB = dateB.isSame(currentDate, 'day');

    const finalDateA = isTodayA ? currentTime : dateA;
    const finalDateB = isTodayB ? currentTime : dateB;

    Math.abs(currentTime.diff(timeA));
    Math.abs(currentTime.diff(timeB));

    const isPassedA = currentTime.isAfter(timeA);
    const isPassedB = currentTime.isAfter(timeB);

    const finalTimeA = isPassedA ? moment.max(timeA, currentTime) : timeA;
    const finalTimeB = isPassedB ? moment.max(timeB, currentTime) : timeB;

    if (finalDateA.isBefore(finalDateB)) return -1;
    if (finalDateA.isAfter(finalDateB)) return 1;

    if (finalTimeA.isBefore(finalTimeB)) return -1;
    if (finalTimeA.isAfter(finalTimeB)) return 1;

    return 0;
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
