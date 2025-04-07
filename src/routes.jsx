import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import ContactsListPage from './pages/ContactsListPage';
import AddEditContactPage from './pages/AddEditContactPage';
import { MainLayout } from './layouts/MainLayout/index.js';
import { ContactsProvider } from './contexts/ContactsContext/index.js';

export const router = createBrowserRouter([
  {
    path: '/home_work44/contacts',
    element: <MainLayout />,
    children: [
      {
        path: 'list',
        element: (
          <ContactsProvider>
            <ContactsListPage />
          </ContactsProvider>
        ),
      },
      {
        path: 'form',
        element: (
          <ContactsProvider>
            <AddEditContactPage />
          </ContactsProvider>
        ),
      },
    ],
  },
  {
    path: '/*',
    element: (
      <>
        <Navigate replace to="/home_work44/contacts/list" />
        <Outlet />
      </>
    ),
  },
]);
