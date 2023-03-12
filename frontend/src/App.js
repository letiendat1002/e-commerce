import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Home from "./page/Home";
import Menu from "./page/Menu";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      {/* <Menu /> */}
      <Home />
      <Footer />
    </>
  );
}

export default App;
