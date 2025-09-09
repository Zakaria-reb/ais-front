import {Routes,Route} from 'react-router-dom';
import App from './App';

function Main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
    </Routes>
  )
}

export default Main
