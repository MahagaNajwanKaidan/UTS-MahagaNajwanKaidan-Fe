import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

// PAGES
import Home from "./pages/Home";



// COMPONENTS
import Frame from "./components/Frame";
import RatingRoom from "./pages/RatingRoom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      palette: {
        red: "#8E0000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/ratingRoom" element={<RatingRoom />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/room" element={<Room />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
