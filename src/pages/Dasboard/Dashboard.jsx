import { useEffect } from 'react';
import { DashboardList } from '../../components/DashboardList/DashboardList';
import { addDriver, fetchDrivers } from '../../Redux/Drivers/driversThunks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';

export const Dashboard = () => {
  const [showModal, setShowModal] = useState();
  const dispatch = useDispatch();

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      addDriver({
        name: form.elements.name.value,
        surname: form.elements.surname.value,
        date: form.elements.date.value,
        city: form.elements.city.value,
        time: form.elements.time.value,
      })
    );
    form.reset();
    toggleModal();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Водії</h1>
      <button onClick={toggleModal}>додати водія</button>

      {showModal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder='імʼя'/>
            <input type="text" name="surname" placeholder='прізвище'/>
            <input type="text" name="date" placeholder='дата'/>
            <input type="text" name="city" placeholder='місто'/>
            <input type="text" name="time" placeholder='час'/>

            <button type="submit">Додати</button>
          </form>
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
      <DashboardList />
    </div>
  );
};
