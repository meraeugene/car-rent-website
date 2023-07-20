import Navbar from "./components/Navbar/Navbar";
import { LikedCarsProvider } from "./context/LikedCarContext";
import { Routes, Route } from "react-router-dom";
import { Home, Collection, Notification, Settings, Account } from "./pages";
import { CarDetails } from "./pages/CarDetails/CarDetails";
import Payment from "./pages/Payment/Payment";
import Category from "./pages/Category/Category";

const App = () => {
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
