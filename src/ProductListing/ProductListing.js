import NavBar from "../Components/NavBar/NavBar";
import Products from "../DummyData/Products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import CardPrimary from "../Components/Common/CardPrimary/CardPrimary";
import Button from "../Components/Common/Button/Button";
import NotificationBar from "../Components/Notifications/NotificationBar";
import store from "../redux/reducers";
import { addItem, pushNotification, removeItem } from "../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";

function ProductListing({ selected, addItem, removeItem, history }) {
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState(Products);

  function onSort(e) {
    if(e.key!==sort)
      setSort(e.key);
    else
      setSort('');
  }

  function onFilter(e) {
    if(e.key===filter)
      setFilter('');
    else
      setFilter(e.key);
  }

  useEffect(() => {
    if(sort === 'asc') {
      const newProducts = [...Products].filter(({name}) => (!filter || filter === name)).sort(({ price: a }, { price: b }) => a - b);
      setProducts(newProducts);
    } else if(sort === 'desc') {
      const newProducts = [...Products].filter(({name}) => !filter || filter === name).sort(({ price: a }, { price: b }) => b - a);
      setProducts(newProducts);
    } else {
      const newProducts = [...Products].filter(({name}) => !filter || filter === name);
      setProducts(newProducts);
    }
  }, [sort, filter]);

  function onBuyNow() {
    if(selected.length == 0) {
      store.dispatch(pushNotification({ text: 'no items selected', type: "warning", key: 'no items selected' }));
    } else {
      history.push('/checkout');
    }
  }

  function selectItem(index) {
    let it = selected.indexOf(index);
    if(it>-1) {
      removeItem(index);
    } else {
      addItem(index);
    }
  }

  const menu = <Menu onClick={onSort}>
    <Menu.Item key="asc">
      <p className={`text-xs mb-1 ${sort === 'asc' ? 'font-semibold' : ''}`}>
        Sort by price (low to high)
      </p>
    </Menu.Item>
    <Menu.Item key="desc">
      <p className={`text-xs mb-1 ${sort === 'desc' ? 'font-semibold' : ''}`}>
        Sort by price (high to low)
      </p>
    </Menu.Item>
  </Menu>;
  const filterMenu = <Menu onClick={onFilter}>
    {Array.from(new Set(Products.map(({ name }) => {return name;}))).map((name) => <Menu.Item key={name}>
      <p className={`text-xs mb-1 ${filter === name ? 'font-semibold' : ''}`}>
        {name}
      </p>
    </Menu.Item>)}
  </Menu>;
  const bottomBar = <div className="flex justify-between pb-2">
    <p className="text-xs">{Products.length} items listed</p>
    <div className="flex items-center">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link flex items-center" onClick={e => e.preventDefault()}>
          <FontAwesomeIcon
              icon={faSort}
              size="1x"
              className="cursor-pointer"
          />
          <p className="mx-1 cursor-pointer mb-0 text-xs sm:text-base">Sort</p>
          <DownOutlined />
        </a>
      </Dropdown>
      <Dropdown overlay={filterMenu} trigger={['click']}>
        <a className="ant-dropdown-link flex items-center" onClick={e => e.preventDefault()}>
          <FontAwesomeIcon
              icon={faFilter}
              size="1x"
              className="ml-5 cursor-pointer"
          />
          <p className="ml-1 mr-5 cursor-pointer mb-0 text-xs sm:text-base">Filter</p>
          <DownOutlined />
        </a>
      </Dropdown>
      <Button className="hidden sm:block ml-3 hover:shadow-red bg-chai-red rounded-md text-white font-semibold p-3 px-10" text="Buy Now" onClick={onBuyNow} />
    </div>
  </div>;

  return <>
    <NavBar title="Featured" bottomBar={bottomBar} className="mb-5" />
    <NotificationBar />
    <div className="flex max-w-screen-xl px-2 m-auto">
      <div className="w-1/2 sm:pr-2 pr-1">
        {products.filter((a, it) => it%2 == 0).map(({ name, image, subTitle, price, key }) => <CardPrimary
          onClick={() => selectItem(key)}
          className={`cursor-pointer mb-3 ${selected.indexOf(key)>-1 ? 'border-2 border-blue-500 shadow-itemBlue' : 'hover:shadow-md'} rounded-md`}
          noShadow>
          <div className="bg-gray-200 rounded-md mb-1">
            <img className="sm:max-h-48 m-auto max-h-36" src={image} alt={name} />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="mb-1 sm:text-xl text-xs font-semibold">
                {name}
              </p>
              <p className="mb-1 sm:text-sm text-xxs">
                {subTitle}
              </p>
            </div>
            <p className="font-semibold sm:text-xl text-xs">
              ${price}
            </p>
          </div>
        </CardPrimary>)}
      </div>
      <div className="w-1/2 pt-20 sm:pl-2 pl-1">
        {products.filter((a, it) => it%2 == 1).map(({ name, image, subTitle, price, key }) => <CardPrimary
          onClick={() => selectItem(key)}
          className={`cursor-pointer mb-3 ${selected.indexOf(key)>-1 ? 'border-2 border-blue-500 shadow-itemBlue' : 'hover:shadow-md'} rounded-md`}
          noShadow>
          <div className="bg-gray-200 rounded-md mb-1">
            <img className="max-h-48 max-w-48 m-auto" src={image} alt={name} />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="mb-1 sm:text-xl text-xs font-semibold">
                {name}
              </p>
              <p className="mb-1 sm:text-sm text-xxs">
                {subTitle}
              </p>
            </div>
            <p className="font-semibold sm:text-xl text-xs">
              ${price}
            </p>
          </div>
        </CardPrimary>)}
      </div>
    </div>
    <Button className="sm:hidden block sticky bottom-3 m-auto mt-2 bg-chai-red rounded-md text-white font-semibold p-3 px-10" text="Buy Now" onClick={onBuyNow} />
  </>;
};

const mapStateToProps = state => {
  return {
    selected: state?.checkout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: index => {
      dispatch(addItem(index));
    },
    removeItem: index => {
      dispatch(removeItem(index));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListing));