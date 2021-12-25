import { connect } from "react-redux";
import NavBar from "../Components/NavBar/NavBar";
import Products from "../DummyData/Products";
import NotificationBar from "../Components/Notifications/NotificationBar";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import CardPrimary from "../Components/Common/CardPrimary/CardPrimary";
import { pushNotification } from "../redux/actions";
import store from "../redux/reducers";
import { getCards, setCard } from "../DummyData/Cards";
import Button from "../Components/Common/Button/Button";
import Modal from "../Components/Common/Modal/Modal";
import Form from "../Components/Form/Form";
import Input from "../Components/Common/Inputs/Inputs";
import SlickModal from "../Components/Common/SlickModal/SlickModal";
import Locker from 'lockr';

function Checkout({ selected, history }) {
  const [isModalOpen, setModal] = useState(false);
  const [state, setStateHelper] = useState({
    cardDetails: '',
    expiry: '',
    name: '',
    cvv: ''
  });

  function setState(changes) {
    setStateHelper((prev) => ({
      ...prev,
      ...changes
    }));
  }

  useEffect(() => {
    if(!selected.length)
      history.replace('/');
  }, []);

  function addCard() {
    const { name, expiry, cardDetails } = state;
    setCard(name, expiry, cardDetails);
    toggleModal();
    setState({ name: '', expiry: '', cardDetails: '' });
  }

  function toggleModal() {
    setModal(!isModalOpen);
  }

  function onChange(e, type) {
    switch(type) {
      case 'cardDetails':
        if(!/^[0-9]{0,16}$/g.test(e.target.value.replaceAll(' ', '')))
          return;
        setState({ cardDetails: e.target.value.replaceAll(' ', '') });
        break;
      case 'name':
        if(!/^[a-zA-z]*$/g.test(e.target.value.replaceAll(' ', '')))
          return;
        setState({ name: e.target.value });
        break;
      case 'expiry':
        if(!/^[0-9]{0,4}$/g.test(e.target.value.replaceAll(/\//g, '')))
          return;
        setState({ expiry: e.target.value.replaceAll(/\//g, '') });
        break;
      case 'cvv':
      if(!/^[0-9]{0,3}$/g.test(e.target.value.replaceAll(' ', '')))
        return;
      setState({ cvv: e.target.value.replaceAll(' ', '') });
        break;
      case 'validation':
        if(state?.cardDetails.length===16 && state?.expiry.length===4 && state?.name.length)
          return true;
        return false;
      default:
    }
  }

  function addCardModal() {
    const { cardDetails, expiry, name } = state;
    return <Modal title="Enter Card Details" onClose={toggleModal} isCloseOutside={false}>
      <Form onSubmit={addCard} customValidation={() => onChange(null, 'validation')}>
        <div className="flex">
          <div className="mr-5 w-1/2">
            <p className="font-semibold text-lg">Card Number:</p>
            <Input className="mb-3" inputClassName="font-semibold" type="text" value={cardDetails.split('').map((it, i) => (i%4===0 && i ? ' '+it : it)).join('')} onChange={(e) => onChange(e, 'cardDetails')} required/>
          </div>
          <div className="w-1/3">
            <p className="font-semibold text-lg">Expiry:</p>
            <Input className="mb-3" type="text" value={expiry.split('').map((it, i) => (i === 1 ? it+'/' : it)).join('')} onChange={(e) => onChange(e, 'expiry')} required/>
          </div>
        </div>
        <p className="font-semibold text-lg">Card Holder Name:</p>
        <Input className="mb-3" type="text" value={name} onChange={(e) => onChange(e, 'name')} required/>
        <Button type="submit" className="border-2 hover:border-red-300 bg-chai-red text-white rounded-md block m-auto p-2 px-20 mt-5">
          Add
        </Button>
      </Form>
    </Modal>;
  }

  function selectCard(index) {
    setState({
      card: index,
      cvv: ''
    });
  }

  function payNow() {
    store.dispatch(pushNotification({ text: 'Payment Success!', type: "success", key: 'success' }));
    Locker.set('checkout', JSON.stringify([]));
    setTimeout(() => window.location = '/', 1000);
  }

  return <>
    <NavBar title="Check out" className="mb-5" isBack />
    <NotificationBar />
    {isModalOpen && addCardModal()}
    <div className="flex flex-col max-w-screen-xl px-2 m-auto">
      {selected.map((it) => Products[it]).map(({ name, price, subTitle, image }) => <CardPrimary className="sm:w-1/2 lg:w-1/3 mb-2 border-t-2 border-b-2 flex justify-between" noShadow >
          <div className="flex flex-col">
            <p className="mb-0 text-2xl font-semibold">
              {name}
            </p>
            <p className="mb-0 text-sm font-semibold">
              {subTitle}
            </p>
            <p className="mb-0 text-base font-semibold">
              ${price}
            </p>
          </div>
          <div className="bg-gray-200 rounded-md mb-1">
            <img className="sm:max-h-30 m-auto max-h-28" src={image} alt={name} />
          </div>
      </CardPrimary>)}
      <div className="flex justify-between items-center sm:w-1/2 mb-2">
        <p className="font-semibold mb-0 text-2xl">
            Payment
        </p>
        <p className="font-semibold mb-0 text-base cursor-pointer text-grey hover:text-black" onClick={toggleModal}>
          + Add New Card
        </p>
      </div>
      {getCards().length == 0 && <p className="font-semibold text-xl text-grey text-center w-1/2 my-3">
        No cards
      </p>}
      {getCards().map(({ cardNumber, expiry, name, image }, it) => <CardPrimary className="flex cursor-pointer border-2 pr-4 mr-auto mb-4 rounded-lg" noShadow onClick={() => selectCard(it)}>
        <div className="h-5 w-5 border-2 border-blue-400 rounded-full flex justify-center items-center mr-4">
          <div className={`h-3 w-3 ${state?.card == it ? 'bg-blue-500' : ''} rounded-full`} />
        </div>
        <div>
          <p className="mb-0 mr-4 font-semibold">
            {name}
          </p>
          <div className="flex justify-items-start items-center">
            <p className="text-base sm:text-xl font-semibold mr-2">
              **** **** **** {cardNumber.slice(12)}
            </p>
            <img className="max-h-3" src={image} alt="card logo" />
          </div>
          <p className="mb-0 font-semibold">
            Expiry: {expiry?.month <10 ? `0${expiry?.month}` : expiry?.month}/{expiry.year}
          </p>
          {state?.card===it && <div className="flex items-center">
            <p className="mb-0 font-semibold mr-2">
              CVV:
            </p>
            <Input className="w-1/3" type="text" value={state?.cvv} onChange={(e) => onChange(e, 'cvv')} required/>
          </div>}
        </div>
      </CardPrimary>)}
      <Button
      disabled={getCards().length==0 || state?.card==undefined || state?.cvv?.length!==3}
      className="hover:shadow-red bg-chai-red rounded-md m-auto sm:ml-0 sm:mr-auto p-2 px-20 mt-5 mb-5"
      onClick={payNow}>
        <p className="text-white text-xl font-semibold">
          Pay Now
        </p>
      </Button>
    </div>
  </>;
};

const mapStateToProps = state => {
  return {
    selected: state?.checkout
  };
};

export default connect(mapStateToProps, null)(withRouter(Checkout));
