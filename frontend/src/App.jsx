import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import router from "./routes";
import './App.scss';


function App() {
  return <div className='App'>
     <RouterProvider router={router} />
  </div>;
}

export default App;

