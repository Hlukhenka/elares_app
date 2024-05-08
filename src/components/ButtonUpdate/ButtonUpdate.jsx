import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { updateDriver } from '../../Redux/Drivers/driversThunks';
import { CgPen } from 'react-icons/cg';

export const ButtonUpdate = ({ driver }) => {
  const [showModal, setShowModal] = useState();
  const [data, setData] = useState(driver);
  const dispatch = useDispatch();
  const toggleModal = () => setShowModal(!showModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      updateDriver({
        name: form.elements.name.value,
        surname: form.elements.surname.value,
        date: form.elements.date.value,
        city: form.elements.city.value,
        time: form.elements.time.value,
        notes: form.elements.notes.value,
        id: driver._id,
      })
    );

    form.reset();
    toggleModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      {showModal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              value={data.surname}
            />
            <input
              type="text"
              name="date"
              onChange={handleChange}
              value={data.date}
            />
            <input
              type="text"
              name="city"
              onChange={handleChange}
              value={data.city}
            />
            <input
              type="text"
              name="time"
              onChange={handleChange}
              value={data.time}
            />
            <input
              type="text"
              name="notes"
              onChange={handleChange}
              value={data.notes}
            />

            <button type="submit">Додати</button>
          </form>
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
      <button onClick={toggleModal}>
        <CgPen style={{ width: '100%', height: '100%' }} />
      </button>
    </>
  );
};
