import { useState } from 'react';
import { deleteDriver } from '../../../Redux/Drivers/driversThunks';
import { ButtonUpdate } from '../../ButtonUpdate/ButtonUpdate';
import { Item, AdaptiveBox } from '../DashboardItem/DashboardItem.styled';
import { useDispatch } from 'react-redux';
import { CgTrash } from 'react-icons/cg';
import { Modal } from '../../Modal/Modal';

export const DashboardItem = ({ driver, backgroundColor }) => {
  const [showModal, setShowModal] = useState();
  const dispatch = useDispatch();

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Item
      key={driver._id}
      onClick={toggleModal}
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      {/* {showModal && (
        <Modal>
          <p>Імʼя: {driver.name}</p>
          <p>Прізвище: {driver.surname}</p>
          <p>Дата: {driver.date}</p>
          <p>Час: {driver.time}</p>
          <p>Місто: {driver.city}</p>
          <p>Нотатки: {driver.notes}</p>

          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )} */}
      <AdaptiveBox>
        <p>{driver.name}</p>
        <p> {driver.surname}</p>
      </AdaptiveBox>
      <AdaptiveBox>
        <p>{driver.time}</p>
        <p>{driver.date}</p>
      </AdaptiveBox>
      <p>{driver.city}</p>
      <ButtonUpdate driver={driver} />
      <button onClick={() => dispatch(deleteDriver(driver._id))}>
        <CgTrash style={{ width: '100%', height: '100%' }} />
      </button>
    </Item>
  );
};
