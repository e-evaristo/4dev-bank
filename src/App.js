import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Account from './pages/Account';
import Balances from './pages/Balances';
import Extracts from './pages/Extracts';
import Home from './pages/Home';
import Operations from './pages/Operations';
import AccountForm from './pages/Account/AccountForm';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Account />} />
            <Route path="/account" element={<AccountForm />} />
            <Route path="/account/:_id" element={<AccountForm />} />
            <Route path="/extracts" element={<Extracts />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/balances" element={<Balances />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
