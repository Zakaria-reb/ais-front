import {Routes,Route} from 'react-router-dom';
import App from './App';
import InscriptionPage from './InscriptionPage';

function Main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/inscription' element={<InscriptionPage />} />
    </Routes>
  )
}

export default Main
