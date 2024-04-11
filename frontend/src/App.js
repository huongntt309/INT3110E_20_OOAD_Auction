import { Fragment, createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { CustomerLayout } from '~/layouts';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const authUserContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('user')));
  const handleAuthUser = (data) => setAuthUser(data);
  const value = {
    authUser,
    handleAuthUser,
  };
  
  return (
    <authUserContext.Provider value={value}>
      <Router>
        <div className="App">
          <ToastContainer />
          <ScrollToTop />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
  
              let Layout = CustomerLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
  
              return (
                <Route 
                  key={index} 
                  path={route.path} 
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  } 
                />
              )
            })}
          </Routes>
        </div>
      </Router>
    </authUserContext.Provider>
  );
}

export default App;
