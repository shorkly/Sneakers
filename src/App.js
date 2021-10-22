import React from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Orders from './pages/Orders'

export const AppContext = React.createContext({}) //если я захожу создать обьякт путем (const app = {}),
// то тогда я захочу сдеать какие то изменения в этом обьекте реакт этого не поймет,
// а в данном случае если я сделаю какое то изменение этот обьект оповестит каждый
// компонент зависящий от него об изменении

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favItems, setFavItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isReady, setIsReady] = React.useState(true);
  React.useEffect(()=>{
    /* fetch('https://615c9189c298130017736255.mockapi.io/items').then((res) => {
      return res.json();
    }).then(json => {
      setItems(json)
    }) */
    async function fetchData() {
        //setIsReady(true) //если функция фетчДата выполняется больше чем один раз лучше предварительно ставить loading(true)
        const itemsResp = await axios.get('https://6137be32eac1410017c18470.mockapi.io/items'); //.then((res)=>{ //дожидаемся асинхронной загрузки
        // setItems(res.data); //получаем данные о товарах
        //});
        const cartResp = await axios.get('https://6137be32eac1410017c18470.mockapi.io/cart'); //.then((res)=>{
        //setCartItems(res.data); //получаем инфу о данных корзины
        //});
        const favoritesResp = await axios.get('https://6137be32eac1410017c18470.mockapi.io/favorites'); //.then((res)=>{
        //setFavItems(res.data); //получаем инфу о данных фаворитов
        //});

        setIsReady(false);

        setCartItems(cartResp.data);
        setFavItems(favoritesResp.data);
        setItems(itemsResp.data);
    }
    fetchData();
  }, []);
  const onAddToCart = (obj) => {
    try{
        if (cartItems.find((item)=> Number(item.id) === Number(obj.id))){
            axios.delete(`https://6137be32eac1410017c18470.mockapi.io/cart/${obj.id}`);
            setCartItems(prev => prev.filter(item=>Number(item.id)!==Number(obj.id) ))// приводим  айди к одному типу что бы удалялось точно за одним числом
        }else {
            axios.post('https://6137be32eac1410017c18470.mockapi.io/cart', obj ); //добавляет в корзину
            setCartItems((prev)=>[...prev, obj]);
        }
    }catch (error) {
    alert('Не удалось добавить в корзину');
    }
  }
  const onFavorite = async (obj) => {
      try{
          if(favItems.find(favObj=>Number(favObj.id)===Number(obj.id))){
              axios.delete(`https://6137be32eac1410017c18470.mockapi.io/favorites/${obj.id}`);
              setFavItems((prev)=>prev.filter((item)=>Number(item.id) !== Number(obj.id)));
          }else{
              const {data} = await axios.post('https://6137be32eac1410017c18470.mockapi.io/favorites', obj); //добавляет в закладки
              setFavItems((prev)=>[...prev, obj]);
          }
      }catch (error) {
        alert('Не удалось добавить в избранное  ')
      }
  }
  const onRemoveBtn=(id)=>{ //удаляет элемент из массива товаров в корзине
    axios.delete(`https://6137be32eac1410017c18470.mockapi.io/cart/${id}`);
    setCartItems((prev)=>prev.filter(item=>item.id!==id));
  }
  const onSearchInp = (event) =>{ //ищем соответствия в поиске
    setSearchValue(event.target.value);
  }
  const getAddedItems = (id)=>{ //если хотя бы один айди который
      // тебе передали есть в корзине
      //выдавай true иначе false
      console.log(cartItems, 222)
      return cartItems.some(obj=>Number(obj.parentId)===Number(id)) //find вернет обьект или undefined, поэтому мы используем some, означает хотя бы что то (оно не вернет нам значение false когда нам это будет нужно)
  };
/*   const onDelete = (obj) => {
    const arr = cartItems.filter((item) => item.name !== obj);
    setCartItems(arr);
}; */
  return (
      <AppContext.Provider value={{ items, cartItems, favItems,
          getAddedItems,onFavorite, setCartItems,
          onAddToCart}}>
{/*в value мы передаем те данные которые нам нужны напр. cartItems, setFavItems и т.д*/}
          <Router>
              <div className="wrapper">
                  {cartOpened && <Cart items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveBtn} /> }
                  <Header onClickCart={() => setCartOpened(true)}/>
                  {/* в любой компонент в реакте мы можем передавать пропсы */} {/* отсюда мы берем пропс onClickCart={....} и передаем в хеадер => function Header(PROPS){....} , если вызвать консоль.лог(пропс) там можно все увидеть */}
                  <span className='line'></span>
                  <main>
                      <Switch>
                          <Route path='/favorites' exact>
                              <Favorites />
                          </Route>
                          <Route path='/orders' exact>
                              <Orders />
                          </Route>
                          <Route path={process.env.PUBLIC_URL + "/"}>
                              <Home items={items}
                                    cartItems={cartItems}
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    onSearchInp={onSearchInp}
                                    onAddToCart={onAddToCart}
                                    onFavorite={onFavorite}
                                    isReady={isReady}
                              />
                          </Route>
                      </Switch>
                  </main>
              </div>
          </Router>
      </AppContext.Provider> //теперь весь этот код будет знать что есть в AppContext компоненте
  );
}

export default App;