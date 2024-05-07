import { useState } from 'react';
import { deleteDriver } from '../../../Redux/Drivers/driversThunks';
import { ButtonUpdate } from '../../ButtonUpdate/ButtonUpdate';
import { Item } from '../DashboardList.styled';
import { useDispatch } from 'react-redux';
import { Modal } from '../../Modal/Modal';

export const DashboardItem = ({ driver }) => {
  const [showModal, setShowModal] = useState();
  const dispatch = useDispatch();

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Item key={driver._id} onClick={toggleModal}>
      {showModal && (
        <Modal>
          <p>Імʼя: {driver.name}</p>
          <p>Прізвище: {driver.surname}</p>
          <p>Дата: {driver.date}</p>
          <p>Час: {driver.time}</p>
          <p>Місто: {driver.city}</p>
          <p>Нотатки: {driver.notes}</p>

          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
      <p>{driver.name} </p>
      <p> {driver.surname}</p>
      <p> {driver.time}</p>
      <p> {driver.city}</p>
      <p> {driver.date}</p>
      <ButtonUpdate driver={driver}>Редагувати</ButtonUpdate>
      <button onClick={() => dispatch(deleteDriver(driver._id))}>
        Видалити
      </button>
    </Item>
  );
};
