import { Route, Routes } from 'react-router-dom'
/**********   ADD PAGE ROUTE HERE   **********/
import HomePage from './pages/Home/HomePage'
import PrivateStorage from './pages/Resource/PrivateStorage'
import {
  ChangePassword,
  Confirmation,
  Login,
  PasswordReset,
  ResetPassword,
} from './pages/Authentication'
import CourseStructure from './pages/Resource/CourseStructure'
import FileDetails from './pages/Resource/FileDetails'
import CurrentSesion from './pages/Sessions/CurrentSession'
import RegisterSession from './pages/Sessions/RegisterSession'

function App() {
  return (
    <Routes>
      {/* GENERAL */}
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<h1>About Page</h1>} />

      {/* LOGIN MODULE */}
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/password-reset-notification" element={<PasswordReset />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/confirmation" element={<Confirmation />} />
      {/* RESOURCE MODULE */}
      <Route path="/user/private" element={<PrivateStorage />} />
      <Route path="/courses" element={<CourseStructure/>} />
      {/* SCHEDULE MODULE */}
      <Route path="/sessions" element={<CurrentSesion />} />
      <Route path="/sessions/register" element={<RegisterSession/>} />
    </Routes>
  )
}

export default App
