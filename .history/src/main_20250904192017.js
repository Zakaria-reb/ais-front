import {Routes,Route} from 'react-router-dom';
import ChatInterface from './pages/chatInterface';
import Home from './pages/Home';
import Auth from './pages/auth';

function App() {

  return (
    <Routes>
        <Route path='/' element={<Home/>} />
    </Routes>
  )
}

export default App
