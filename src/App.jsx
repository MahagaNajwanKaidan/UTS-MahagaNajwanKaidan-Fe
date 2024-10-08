import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

// PAGES
import Home from "./pages/Home";
import Machine from "./pages/Machine";


// COMPONENTS
import Frame from "./components/Frame";
import RatingRoom from "./pages/RatingRoom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";

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
            <Route path="/" element={<Home />} />
            <Route path="/machine" element={<Machine />} />
            <Route path="/products" element={<RatingRoom />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/room" element={<Room />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
