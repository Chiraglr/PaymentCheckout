import React, { useEffect, useRef, useState } from "react";
import SlickLoader from "../SlickLoader/SlickLoader";
import styles from './Modal.module.scss';

import { CloseOutlined } from '@ant-design/icons';

export default function Modal({ className, onClose, isCloseOutside = true, title, titleClassName='', children }) {
  const [isLoading, toggleLoader] = useState(true);
  const bg = useRef();
  const modal = useRef();

  function beforeClose() {
    bg.current.classList.remove('animate-fade');
    bg.current.classList.add('animate-fadeOut');
    modal.current.classList.remove('animate-modal');
    modal.current.classList.add('animate-modalOut');
    setTimeout(onClose, 500);
  }

  function onClickOutside() {
    if (isCloseOutside && !isLoading) beforeClose();
  }

  useEffect(() => setTimeout(() => {
    toggleLoader(!isLoading);
    // setTimeout(() => modal.current.classList.add('transform-none'), 0);
  }, 500), []);

  return (
    <>
      {/* <div ref={bg} className="animate-fade fixed overflow-auto h-screen w-screen top-0 left-0 z-10 bg-black bg-opacity-50" />
      <div
        className="z-20 h-screen w-screen fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center"
        onClick={onClickOutside}
      >
        {(isLoading) ? <SlickLoader /> : <div
          ref={modal}
          className={`${styles.modal} bg-white p-5 text-black rounded-xl ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <p className={`mr-5 ${titleClassName}`}>{title}</p>
            <CloseOutlined className="text-black text-lg font-bold" onClick={beforeClose} />
          </div>
          {children}
        </div>}
      </div> */}
      <div ref={bg} className="animate-fade fixed overflow-auto h-screen w-screen top-0 left-0 z-10 bg-black bg-opacity-50" />
      <div
        className="z-20 h-screen w-screen fixed top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center"
        onClick={onClickOutside}
      >
        {(isLoading) ? <SlickLoader /> : <>
          <div
            ref={modal}
            className={`animate-modal bg-white text-black rounded ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-1 pl-5 pt-4">
              <p className={`mr-5 font-semibold text-xl ${titleClassName}`}>{title}</p>
              <CloseOutlined className="text-black text-lg font-bold" onClick={beforeClose} />
            </div>
            <div className="p-5">
              {children}
            </div>
          </div>
        </>}
        </div>
    </>);
}
