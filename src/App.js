// import logo from './logo.svg';
import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Users from './pages/users';
import AddUser from './pages/addUser';
import Update from './pages/update';
import "./style.css";

// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={apiResponse:" "};
//   }

//   callApi(){
//     fetch("http://localhost:9000/userAPI")
//     .then(res => res.text())
//     .then(res => this.setState({apiResponse: res}));
//   }


// componentWillMount(){
//   this.callApi();
// }

// render() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//       </header>
//       <p>
//          {this.state.apiResponse}
//       </p>
//     </div>
//   );
// }
// }

function App(){
  return(
    <div className='App'style={{backgroundImage: `url("http://localhost:9000/images/1665850776765.jpg")`}}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/add" element={<AddUser/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
