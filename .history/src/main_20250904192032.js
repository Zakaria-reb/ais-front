import {Routes,Route} from 'react-router-dom';
import ChatInterface from './pages/chatInterface';
import Home from './pages/Home';
import Auth from './pages/auth';

function main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
    </Routes>
  )
}

export default App
