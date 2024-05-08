import { useSelector } from 'react-redux';
import { getAllDrivers } from '../../Redux/Drivers/selectors';
import moment from 'moment';
import { ListWrapper, List } from './DashboardList.styled';
import { DashboardItem } from './DashboardItem/DashboardItem';

export const DashboardList = () => {
  const allDrivers = useSelector(getAllDrivers);

  const currentDate = moment().startOf('day');

  const sortedDrivers = [...allDrivers].sort((a, b) => {
    moment(a.date, 'DD.MM').startOf('day');
    moment(b.date, 'DD.MM').startOf('day');
    moment(a.time, 'HH:mm');
    moment(b.time, 'HH:mm');

    const diffA = moment()
      .startOf('day')
      .diff(moment(a.date + ' ' + a.time, 'DD.MM HH:mm'));
    const diffB = moment()
      .startOf('day')
      .diff(moment(b.date + ' ' + b.time, 'DD.MM HH:mm'));

    if (diffA > diffB) return -1;
    if (diffA < diffB) return 1;

    return 0;
  });

  return (
    <ListWrapper>
      <List>
        {sortedDrivers.map((driver) => {
          const driverDate = moment(driver.date, 'DD.MM');

          let bgColor = '';

          if (driverDate.isSame(currentDate, 'day')) {
            bgColor = 'rgba(255, 165, 0, 0.5)';
          } else if (driverDate.isBefore(currentDate)) {
            bgColor = 'rgba(255, 0, 0, 0.5)';
          } else if (
            driverDate.isSame(currentDate.clone().add(1, 'day'), 'day')
          ) {
            bgColor = 'rgba(255, 255, 0, 0.5)';
          } else {
            bgColor = 'rgba(0, 255, 0, 0.5)';
          }

          return (
            <DashboardItem
              driver={driver}
              key={driver._id}
              backgroundColor={bgColor}
            />
          );
        })}
      </List>
    </ListWrapper>
  );
};
