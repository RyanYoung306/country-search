import './App.css';
import SearchBar from './components/search'
import React from "react"; 

function App() {
  return (
    <div className="App">
      <div className="HeaderStyle">
          <img src="planetImage.png" width="300" height="300" alt='planetImage' style={{margin: "10px"}} />
          <div>
            <h1 class="titleText"style={{color: "rgba(255,255,255)" , margin: "60px" }}>Country Search</h1>
            <h4 class="subText"style={{color: "rgba(255,255,255)"}}>Created By Ryan Young</h4>
          </div>
      </div>
      <header className="App-header">
        <SearchBar/>
      </header>
      <div className="App-body">
      </div>
    </div>
  );
}
export default App;
