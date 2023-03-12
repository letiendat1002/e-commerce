import { RouterProvider } from 'react-router-dom'
import Header from "./layouts/Header";
// import Home from "./pages/Home";
import router from './routes';
function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
