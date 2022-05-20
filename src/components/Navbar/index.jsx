import { Link } from "react-router-dom";

import logo from '../../img/logo-wide.png';

import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo"><img src={logo} alt="4DevBank" /></Link>
                <ul className="list">
                    <li className="item"><Link to="/">Home</Link></li>
                    <li className="item"><Link to="/accounts">Contas</Link></li>
                    <li className="item"><Link to="/extracts">Extrato</Link></li>
                    <li className="item"><Link to="/operations">Operações</Link></li>
                    <li className="item"><Link to="/balances">Saldo</Link></li>
                </ul>
            </div>
            
        </nav>
    );
}

export default Navbar;