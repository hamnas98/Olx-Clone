import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Details from "./Components/Details/Details";
import Footer from "./Components/Footer/Footer";
import Wishlist from "./Components/Pages/Wishlist";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/wishlist" element = {<Wishlist/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
