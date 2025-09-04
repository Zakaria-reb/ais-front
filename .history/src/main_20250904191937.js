import {Routes,Route} from 'react-router-dom';
import ChatInterface from './pages/chatInterface';
import Home from './pages/Home';
import Auth from './pages/auth';

function App() {

  return (
    <Routes>
        <Route path='/chat' element={<ChatInterface/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/Auth' element={<Auth/>} />
    </Routes>
  )
}

export default App
