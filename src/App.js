import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/auth';
import Rotas from './routes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Rotas />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
