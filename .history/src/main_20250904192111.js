import {Routes,Route} from 'react-router-dom';
import App from './App';

function Main() {

  return (
    <Routes>
        <Route path='/home' element={<App />} />
    </Routes>
  )
}

export default Main
