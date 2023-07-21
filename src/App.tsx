import Navbar from "./components/Navbar/Navbar";
import { LikedCarsProvider } from "./context/LikedCarContext";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Collection, Notification, Settings, Account } from "./pages";
import { CarDetails } from "./pages/CarDetails/CarDetails";
import Payment from "./pages/Payment/Payment";
import Category from "./pages/Category/Category";
import { useEffect } from "react";

const App = () => {
  const location = useLocation(); // Get the current location from react-router-dom

  // Scroll to the top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  document.documentElement.style.setProperty("--animate-duration", ".7s");

  return (
    <div className="App">
      <LikedCarsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
          <Route path="/:id/payment" element={<Payment />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </LikedCarsProvider>
    </div>
  );
};

export default App;
