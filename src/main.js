import {Routes,Route} from 'react-router-dom';
import App from './App';
import InscriptionPage from './pages/Inscription.jsx';
import LoginPage from './pages/Login.jsx';
import MembersArea from './members/App';
import './members/index.css';

function Main() {

  return (
    <Routes>
  <Route path='/' element={<App />} />
  <Route path='/inscription' element={<InscriptionPage />} />
  <Route path='/connexion' element={<LoginPage />} />
  <Route path='/members/*' element={<MembersArea />} />
    </Routes>
  )
}

export default Main
