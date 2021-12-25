import React from 'react';
import { connect } from "react-redux";
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import CardPrimary from '../Common/CardPrimary/CardPrimary';
import { closeNotification } from '../../redux/actions';

function NotificationBar({ notifications, closeNotification }) {
  function onClose(e, key) {
    if(e.target.parentNode.nodeName === 'DIV') {
      const card = e.target.parentNode;
      while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
      card.classList.remove('animate-notification-slide');
      card.classList.add('animate-notification-close');
    } else if(e.target.parentNode.parentNode.nodeName === 'DIV') {
      const card = e.target.parentNode.parentNode;
      while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
      card.classList.remove('animate-notification-slide');
      card.classList.add('animate-notification-close');
    } else {
      const card = e.target.parentNode.parentNode.parentNode;
      while (e.target && card.firstChild) {
        card.removeChild(card.firstChild);
      }
      card.classList.remove('animate-notification-slide');
      card.classList.add('animate-notification-close');
    }
    setTimeout(() => closeNotification(key), 200);
  }

  return <div className="fixed right-0 flex flex-col gap-y-2 pr-3 z-10">
    {notifications.map(({ type, text, key }) => <CardPrimary className="animate-notification-slide bg-white flex items-center p-3 w-30 sm:w-72" key={key}>
      <InfoCircleOutlined className={`${type === 'warning' ? "text-red-500" : "text-green-400"} text-base sm:text-2xl`} />
      <p className={`w-full px-3 text-xs sm:text-base font-semibold mb-0`}>
        {text}
      </p>
      <CloseOutlined className="text-base" onClick={(e) => onClose(e, key)} />
    </CardPrimary>)}
  </div>;
};

const mapStateToProps = state => {
  return {
    notifications: state?.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNotification: key => {
      dispatch(closeNotification(key))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
