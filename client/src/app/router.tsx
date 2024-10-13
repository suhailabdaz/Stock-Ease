import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/HomePage"

const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage/>}/>
    </Routes>
  )
}

export default Routing