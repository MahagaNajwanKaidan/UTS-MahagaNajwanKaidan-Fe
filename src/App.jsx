import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

// PAGES
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import RatingRoom from "./pages/RatingRoom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Payment from "./pages/Payment";
import Halaman from "./pages/halaman"; 

// COMPONENTS
import Frame from "./components/Frame"; 


const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#8E0000",
    },
  },
});

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <BrowserRouter>
//         <Frame>
//           <Routes>
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/" element={<Halaman />} />
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/home" element={<Home />} />
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/booking" element={<Booking />} />
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/ratingRoom" element={<RatingRoom />} />
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/profile" element={<Profile />} />
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/room" element={<Room />} />
//             <Route path="/UTS-MahagaNajwanKaidan-Fe/payment" element={<Payment />} />
//           </Routes>
//         </Frame>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// };


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Rute tanpa Frame */}
          <Route path="/UTS-MahagaNajwanKaidan-Fe/" element={<Halaman />} />
          
          {/* Rute dengan Frame */}
          <Route element={<Frame />}>
            <Route path="/UTS-MahagaNajwanKaidan-Fe/home" element={<Home />} />
            <Route path="/UTS-MahagaNajwanKaidan-Fe/booking" element={<Booking />} />
            <Route path="/UTS-MahagaNajwanKaidan-Fe/ratingRoom" element={<RatingRoom />} />
            <Route path="/UTS-MahagaNajwanKaidan-Fe/profile" element={<Profile />} />
            <Route path="/UTS-MahagaNajwanKaidan-Fe/room" element={<Room />} />
            <Route path="/UTS-MahagaNajwanKaidan-Fe/payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};



export default App;
