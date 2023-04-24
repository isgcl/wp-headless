import './App.css';
// import './fonts/heady/heady.css';

import MainPage from './components/main';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // kalıcı bağlantılı gezinme sağlayan eklenti

const router = createBrowserRouter([
  {
    path: "/news",
    element: <MainPage page={'news'} />,
    errorElement: <MainPage page={'error'} />
  },
  {
    path: "/",
    element: <MainPage page={'home'} />,
    errorElement: <MainPage page={'error'} />
  },
  {
    path: "/:slug",
    element: <MainPage page={'news-detail'} />,
    errorElement: <MainPage page={'error'} />
  },
  {
    path: "/page/:slug",
    element: <MainPage page={'page-detail'} />,
    errorElement: <MainPage page={'error'} />
  },
  {
    path: "/cat/:slug",
    element: <MainPage page={'category-articles'} />,
    errorElement: <MainPage page={'error'} />
  },
  {
    path: "/categories",
    element: <MainPage page={'categories'} />,
    errorElement: <MainPage page={'error'} />
  }
]);

const App = ()=> {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
