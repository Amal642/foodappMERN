import './App.css';
import Home from './pages/Home.js'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './pages/SignUp.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './pages/MyOrder.js';

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<SignUp/>}/>
          <Route exact path='/myOrder' element={<MyOrder/>}/>
        </Routes>
      </div>
    </Router> 
    </CartProvider>
  );
}

export default App;
