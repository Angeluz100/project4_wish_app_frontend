import {useState, useEffect} from 'react';
import './App.css';
import Aside from './components/Aside.js';
import Main from './components/Main';

function App() {

  const [wishesState, setWishesState] = useState({ wishes: []});

  // useEffect(() => {
    async function getWishes () {
      const wishes = await fetch('https://project4-wish.herokuapp.com/wishes')
      .then(res => res.json())
      console.log(wishes)
      setWishesState({wishes})
    }
    

    //Loads wishes when page loads

  async function handleAdd(formInputs) {

    try {
    const wish = await fetch('https://project4-wish.herokuapp.com/wishes', {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(formInputs)
    }).then(res => res.json());
    setWishesState(prevState => ({ wishes: [wish, ...prevState.wishes]}))
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleDelete(wishId) {
    try {
      await fetch(`https://project4-wish.herokuapp.com/wishes/${wishId}`, {
        method: 'DELETE'
      })
      const updatedWishes = wishesState.wishes.filter(wish => wish.id !== wishId)
      setWishesState({ wishes: updatedWishes });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(formInputs) {
    try {
      await fetch(`https://project4-wish.herokuapp.com/wishes/${formInputs.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(formInputs)
      })
    } catch (error) {
      console.log(error);
    }  //updates once wish is entered

    const wishIdx = wishesState.wishes.findIndex(wish => wish.id === formInputs.id);
    const updatedWishesArray = wishesState.wishes;
    updatedWishesArray.splice(wishIdx, 1, formInputs);
    setWishesState({ wishes: updatedWishesArray });
  }
  
  async function handleDelete(wishId) {
    try {
      await fetch(`https://project4-wish.herokuapp.com/wishes/${wishId}`, {
        method: 'DELETE'
      })
      const updatedWishes = wishesState.wishes.filter(wish => wish.id !== wishId)
      setWishesState({ wishes: updatedWishes });
    } catch (error) {
      console.log(error);
    }
  }


return (
  <div className="App">
    <header className='App-header'>Wish App</header>
    <h1 className='header'>My Wishes</h1>
    <div className="container">
      
      <Aside handleAdd={handleAdd} />
      <Main
        wishes={wishesState.wishes}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate} 
      />
    </div>
  </div>
)
}
export default App
