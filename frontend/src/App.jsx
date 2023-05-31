import { RouterProvider } from 'react-router-dom';
import Header from './layouts/Header';
// import Home from "./pages/Home";
import router from './routes';
import './index.css'
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
