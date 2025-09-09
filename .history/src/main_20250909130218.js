import {Routes,Route} from 'react-router-dom';
import App from './App';


function Main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/inscription' element={<InscriptionPage />} />
    </Routes>
  )
}

export default Main
