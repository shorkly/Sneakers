import React from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Favorites from './pages/Favorites'
import Home from './pages/Home'

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favItems, setFavItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  React.useEffect(()=>{
    /* fetch('https://615c9189c298130017736255.mockapi.io/items').then((res) => {
      return res.json();
    }).then(json => {
      setItems(json)
    }) */
    axios.get('https://6137be32eac1410017c18470.mockapi.io/items').then((res)=>{
      setItems(res.data); //получаем данные о товарах
    });
    axios.get('https://6137be32eac1410017c18470.mockapi.io/cart').then((res)=>{
      setCartItems(res.data); //получаем инфу о данных корзины
    });
    axios.get('https://6137be32eac1410017c18470.mockapi.io/favorites').then((res)=>{
        setFavItems(res.data); //получаем инфу о данных фаворитов
    });
  }, []);
  const onAddToCart = (obj) => {
    axios.post('https://6137be32eac1410017c18470.mockapi.io/cart', obj ); //добавляет в корзину
    setCartItems((prev)=>[...prev, obj]);
  }
  const onFavorite = async (obj) =>{
      if(favItems.find(favObj=>favObj.id===obj.id)){
          axios.delete(`https://6137be32eac1410017c18470.mockapi.io/favorites/${obj.id}`);
          setFavItems((prev)=>prev.filter((item)=>item.id !== obj.id));
      }else{
          const {data} = await axios.post('https://6137be32eac1410017c18470.mockapi.io/favorites', obj); //добавляет в закладки
          setFavItems((prev)=>[...prev, obj]);
      }
  }
  const onRemoveBtn=(id)=>{ //удаляет элемент из массива товаров в корзине
    axios.delete(`https://6137be32eac1410017c18470.mockapi.io/cart/${id}`);
    setCartItems((prev)=>prev.filter(item=>item.id!==id));
  }
  const onSearchInp = (event) =>{ //ищем соответствия в поиске
    setSearchValue(event.target.value);
  }
/*   const onDelete = (obj) => {
    const arr = cartItems.filter((item) => item.name !== obj);
    setCartItems(arr);
}; */
  return (
      <Router>
          <div className="wrapper">
              {cartOpened && <Cart items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveBtn} /> }
              <Header onClickCart={() => setCartOpened(true)} />
              {/* в любой компонент в реакте мы можем передавать пропсы */} {/* отсюда мы берем пропс onClickCart={....} и передаем в хеадер => function Header(PROPS){....} , если вызвать консоль.лог(пропс) там можно все увидеть */}
              <span className='line'></span>
              <main>
                  <Switch>
                      <Route path={process.env.PUBLIC_URL + '/favorites'} exact>
                          <Favorites items={favItems}
                                     // searchValue={searchValue}
                                     // setSearchValue={setSearchValue}
                                     // onSearchInp={onSearchInp}
                                     // onAddToCart={onAddToCart}
                                     onFavorite={onFavorite}
                          />
                      </Route>
                      <Route path={process.env.PUBLIC_URL + "/"}>
                          <Home items={items}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onSearchInp={onSearchInp}
                                onAddToCart={onAddToCart}
                                onFavorite={onFavorite}
                          />
                      </Route>
                  </Switch>
              </main>
          </div>
      </Router>
  );
}

export default App;