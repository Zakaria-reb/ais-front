import {Routes,Route} from 'react-router-dom';


function Main() {

  return (
    <Routes>
        <Route path='/' element={<App />} />
    </Routes>
  )
}

export default Main
