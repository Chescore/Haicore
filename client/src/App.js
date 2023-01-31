import React from 'react';
import axios from 'axios';
import Layout from './hoc/Layout/layout';
import { AuthContextProvider } from './hoc/AuthContext/auth';

import Router from './Router';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="font-cormorant text-gray-600">
      <AuthContextProvider>
        <Layout>  
          <Router/>
        </Layout>
      </AuthContextProvider>
    </div>
  );
};

export default App;