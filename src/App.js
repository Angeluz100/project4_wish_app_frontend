import {useState, useEffect} from 'react'
import './App.css';
import Form from './components/Form'

function App() {

  const [wishesState, setWishesState] = useState({wishes: []})

  // useEffect(() => {
    async function getWishes () {
      const wishes = await fetch('https://project4-wish.herokuapp.com/wishes')
      .then(res => res.json())
      console.log(wishes)
      setWishesState({wishes})
    }
    

    //Loads wishes when page loads
  useEffect(() => {
    getWishes()
  }, []);

  async function handleAdd(formInputs) {
    const wish = await fetch('https://project4-wish.herokuapp.com/wishes', {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(formInputs)
    }).then(res => res.json())
    // load wishes after you add them
    // getWishes()
    setWishesState(prevState => ({ wishes: [wish, ...prevState.wishes] }))
    
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
      <header className="App-header">
        Wish App
      </header>
      <Form handleAdd={handleAdd}/>
      <div className="container">
        {wishesState.wishes.map((x, index) => (
          <article key={index}>
            <div className="lineItem">
              {x.title}
            </div>
            <div className="lineItem">
              {x.description}
            </div>
            <button onClick={() => handleDelete(x.id)}>X</button>
          </article>
        ))}
      </div>
    </div>
    
  );
}

export default App;
