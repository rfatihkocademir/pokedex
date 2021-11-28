import './App.css';
import Header from './Components/Header/Header';
import Pokecard from './Components/Pokecard/Pokecard';

function App() {
  return (
    <div className="App">
      <div className="containter-fluid">
       <div class="row align-items-center">
          <Header/>
       </div>
       <div class="row align-items-center">
          <Pokecard/>
        </div> 
      </div>
    </div>
  );
}

export default App;
