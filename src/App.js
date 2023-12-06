import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthGuard from './components/Auth/Auth';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import VirtualAgent from './Agent/VirtualAgent';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient()

  useEffect(() => {
    const chat = new window.ServiceNowChat({
        instance: 'https://dev145961.service-now.com',
        context: {
            skip_load_history: 1
        },
        branding: {
            bgColor: '#333',
            primaryColor: '#000',
            hoverColor: '#EFEFEF',
            activeColor: '#AAA',
            openIcon: 'custom-open.png',
            closeIcon: 'custom-close.svg',
            sizeMultiplier: 1.6
        },
        offsetX: 50,
        offsetY: 50,
        position: 'right',
        translations: {
            'Open dialog': 'Open chat',
            'Open Chat. {0} unread message(s)': 'Click to open',
            'Close chat.': 'Click to close',
        },
    });
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/create' element={<CreateUser/>} />
            <Route path='/users/edit/:userId' element={<EditUser/>} />
            <Route path='/users/:userId' element={<UserDetails />} />
          </Route>
        </Routes>
      </div>
      {/* <VirtualAgent/> */}
      <ReactQueryDevtools position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
