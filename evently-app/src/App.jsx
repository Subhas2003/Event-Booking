import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PageTransition from './components/PageTransition.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Booking from './pages/Booking.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/signUp.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<MainApp />} />
    </Routes>
  )
}

function MainApp() {
  const reduxPage = useSelector((s) => s.ui.page)
  const location = useLocation()
  const page = location.pathname === '/explore'
    ? 'explore'
    : location.pathname.startsWith('/event/')
      ? 'event'
      : reduxPage

  const pages = {
    home: <Home />,
    explore: <Explore />,
    event: <EventDetail />,
    booking: <Booking />,
  }

  return (
    <div className="bg-canvas min-h-screen text-text-primary font-body antialiased">
      <Header />
      <PageTransition pageKey={page}>{pages[page] ?? <Home />}</PageTransition>
      <Footer />
    </div>
  )
}
