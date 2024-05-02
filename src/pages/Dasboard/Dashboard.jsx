import { useEffect } from 'react';
import { DashboardList } from '../../components/DashboardList/DashboardList';
import { fetchDrivers } from '../../Redux/Drivers/driversThunks';
import { useDispatch } from 'react-redux';

export const Dashboard = () => {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchDrivers());
  }, [dispath]);

  return (
    <div>
      <DashboardList />
    </div>
  );
};
