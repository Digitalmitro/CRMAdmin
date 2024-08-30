import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { Button, ConfigProvider, Drawer, Space, Badge } from 'antd';
import { createStyles, useTheme } from 'antd-style';

const socket = io(import.meta.env.VITE_BACKEND_API);

const useStyle = createStyles(({ token }) => ({
  'my-drawer-body': {
    background: token.blue1,
  },
  'my-drawer-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-drawer-header': {
    background: token.green1,
  },
  'my-drawer-footer': {
    color: token.colorPrimary,
  },
  'my-drawer-content': {
    borderLeft: '2px dotted #333',
  },
}));

const NavDrawer = ({ open, onClose }) => {
  const { styles } = useStyle();
  const token = useTheme();

  const Profile = localStorage.getItem('admin');
  const NewProfile = JSON.parse(Profile);
  const user_id = NewProfile?._id;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Date');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const adminToken = localStorage.getItem('token');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('new_notification', (notification) => {
      setData((prevData) => [notification, ...prevData]);

      if (Notification.permission === 'granted') {
        new Notification(notification.message, {
          body: notification.currentDate,
        });
      }
    });

    return () => {
      socket.off('new_notification');
      socket.disconnect();
    };
  }, []);

  const classNames = {
    body: styles['my-drawer-body'],
    mask: styles['my-drawer-mask'],
    header: styles['my-drawer-header'],
    footer: styles['my-drawer-footer'],
    content: styles['my-drawer-content'],
  };
  const drawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)',
    },
    content: {
      boxShadow: '-10px 0 10px #666',
    },
    header: {
      borderBottom: `1px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
  };

  const Getdata = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/notification`,
      { headers: { token: adminToken } }
    );
    console.log('response', res);

    setData(res.data.reverse());
  };

  useEffect(() => {
    Getdata();
  }, []);

  const handleClick = async (id) => {
    try {
      console.log('id', id);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/notification/${id}`,
        {
          Status: true,
        }
      );
      Getdata();
      toast.success('Notification Seen');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title="Notifications"
      placement="right"
      onClose={onClose}
      open={open}
      classNames={classNames}
      styles={drawerStyles}
    >
      <div className="notification pb-3">
        <h5 className="all px-1 fw-bold">All</h5>
        <p className="line"></p>
      </div>

      {data?.map((item, index) => (
        <div
          className="d-flex gap-3 mb-2"
          onClick={() => handleClick(item._id)}
          style={{ cursor: 'pointer' }}
          key={index}
        >
          <Badge color={!item.Status ? 'red' : 'green'} />
          <div className="imageURl1 d-flex justify-content-center">
            <p className="text-center py-1">
              <b>JW</b>
            </p>
          </div>
          <div className="notificationText">
            <p>
              <strong>{item.message}</strong>
            </p>
            <p className="timer">1:12PM</p>
          </div>
        </div>
      ))}
    </Drawer>
  );
};

export default NavDrawer;
