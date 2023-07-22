import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { LikedCarsProvider } from "./context/LikedCarContext";

const Home = lazy(() => import("./pages/Home/Home"));
const Collection = lazy(() => import("./pages/Collection/Collection"));
const Notification = lazy(() => import("./pages/Notifications/Notifications"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Account = lazy(() => import("./pages/Account/Account"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Category = lazy(() => import("./pages/Category/Category"));
const CarDetails = lazy(() => import("./pages/CarDetails/CarDetails"));

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
        <Suspense
          fallback={
            <h1 style={{ fontFamily: "var(--font-oswold)" }}>Loading....</h1>
          }
        >
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
        </Suspense>
      </LikedCarsProvider>
    </div>
  );
};

export default App;
