import { useEffect } from 'react';
import { DashboardList } from '../../components/DashboardList/DashboardList';
import { addDriver, fetchDrivers } from '../../Redux/Drivers/driversThunks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { BtnAdd, TitleBox } from './Dashboard.styled';
import { CgAdd } from 'react-icons/cg';

export const Dashboard = () => {
  const [showModal, setShowModal] = useState();
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState(null);

  // Запит дозволу на push-сповіщення
  // const requestPushPermission = async () => {
  //   if ('Notification' in window) {
  //     const permission = await Notification.requestPermission();
  //     if (permission === 'granted') {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  // const subscribeToPush = async () => {
  //   const pushSubscription = await window.ServiceWorker.getRegistration();
  //   if (pushSubscription) {
  //     const pushSubscription = await pushSubscription.pushManager.subscribe({
  //       userVisibleOnly: true,
  //     });
  //     return pushSubscription;
  //   } else {
  //     return null;
  //   }
  // };

  // console.log(subscribeToPush());

  useEffect(() => {
    // Перевірка підтримки сервісу push-сповіщень в браузері
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      // Реєстрація service worker
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(async (registration) => {
          // Запит на отримання підписки
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              'BM8_AkzBViTnkH-sbwWBc5PLYVo7sqg6WF-mW2tbWZl993n4VQSu-IU8TIJsH_XsNNBP6qZu5Z7-sMHw1IqntOQ'
            ), // Публічний ключ сервера
          });

          // Встановлення підписки
          setSubscription(subscription);
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });
    } else {
      console.warn('Push messaging is not supported');
    }
  }, []);

  // Функція для конвертації base64 рядка в Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Функція для відправлення підписки на сервер
  const sendSubscriptionToServer = async () => {
    try {
      // Перевірка чи маємо підписку
      if (subscription) {
        // Відправка підписки на сервер
        await fetch('https://elares-back.onrender.com/api/auth/subscription', {
          method: 'PUT',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmY2ZmJiMWJmMTRhZDY1YjYzYjc0NiIsImlhdCI6MTcxNTY5MTcwOSwiZXhwIjoxNzE1Nzc4MTA5fQ.fFIWed8kc08JY6tNCt3I1Af40ryQ1300KWz7dsL5qSw`,
          },
        });
        console.log('Subscription sent to server');
      } else {
        console.error('No subscription available');
      }
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  };

  // Виклик функції для відправлення підписки на сервер
  useEffect(() => {
    if (subscription) {
      sendSubscriptionToServer();
    }
  }, [subscription]);

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
      <TitleBox>
        <h1>Водії</h1>
        <BtnAdd onClick={toggleModal}>
          <CgAdd style={{ width: '100%', height: '100%' }} />
        </BtnAdd>
      </TitleBox>

      {showModal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="імʼя" />
            <input type="text" name="surname" placeholder="прізвище" />
            <input type="text" name="date" placeholder="дата" />
            <input type="text" name="city" placeholder="місто" />
            <input type="text" name="time" placeholder="час" />

            <button type="submit">Додати</button>
          </form>
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
      <DashboardList />
    </div>
  );
};
