import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import store from './utils/store';

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element: <>
        <Login/>
        <Register/>
      </>
    },
    {
      path:'/home',
      element:<Home/>
    }
  ]);

  const App = ()=>(
     <Provider store={store}>
    <div>
        <RouterProvider router={appRouter}/>
    </div>
    </Provider>
)

export default App;
