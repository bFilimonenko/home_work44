import { createBrowserRouter } from 'react-router';
import ContactsListPage from './pages/ContactsListPage';
import AddEditContactPage from './pages/AddEditContactPage';
import { MainLayout } from './layouts/MainLayout/index.js';
import { ContactsProvider } from './contexts/ContactsContext/index.js';
import StartPage from './pages/StartPage/index.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/home_work42',
        element: <StartPage />,
      },
      {
        path: '/list',
        element: (
          <ContactsProvider>
            <ContactsListPage />
          </ContactsProvider>
        ),
      },
      {
        path: '/form',
        element: (
          <ContactsProvider>
            <AddEditContactPage />
          </ContactsProvider>
        ),
      },
      {
        path: '/*',
        element: <h1>oops, something went wrong</h1>,
      },
    ],
  },
]);
