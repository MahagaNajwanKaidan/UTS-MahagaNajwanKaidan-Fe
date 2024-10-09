import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Room from './pages/Room.jsx'
import RatingRoom from './pages/RatingRoom.jsx'
import Booking from './pages/Booking.jsx'
import Payment from './pages/Payment.jsx'
import Frame from './components/Frame.jsx'


const router = createBrowserRouter([
  {
    path: "/FE_MahagaNajwanKaidan_XIIRPL/Home",
    element: <Home/>
  },
  {
    path: "/FE_MahagaNajwanKaidan_XIIRPL/room",
    element: <Room/>,
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/room",
    element: <RatingRoom/>
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/member",
    element: <Booking/>,
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/trainer",
    element: <Payment/>
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/session",
    element: <Frame/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)