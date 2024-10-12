import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Routing from './router.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Routing/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App