import './SlickModal.scss';

function SlickModal({ onClose }) {

  return <>
    <div className="animate-fade fixed overflow-auto h-screen w-screen top-0 left-0 z-10 bg-black bg-opacity-50"/>
    <div id="container" className="z-20 h-screen w-screen fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center" onClick={onClose} >
      <div id="slick-modal" onClick={(e) => e.stopPropagation()}>
        <p>
          hey
        </p>
      </div>
    </div>
  </>
};

export default SlickModal;
