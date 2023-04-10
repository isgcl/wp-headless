import './App.css';

import MainPage from './components/main';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // kalıcı bağlantılı gezinme sağlayan eklenti


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage page={'news'} />,
    errorElement: <MainPage page={'error'} />
  },
  {
    path: "/:slug",
    element: <MainPage page={'news-detail'} />,
    errorElement: <MainPage page={'error'} />
  }
]);

const App = ()=> {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
