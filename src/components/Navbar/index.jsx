import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

import logo from '../../img/logo-wide.png';

import './navbar.css';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/home" className="logo"><img src={logo} alt="4DevBank" /></Link>
                <ul className="list">
                    <li className="item"><Link to="/home">Home</Link></li>
                    <li className="item"><Link to="/accounts">Contas</Link></li>
                    <li className="item"><Link to="/balances">Saldo</Link></li>
                    <li className="item"><Link to="/extracts">Extrato</Link></li>
                    <li className="item"><Link to="/operations">Operações</Link></li>
                    <li className="item">
                        <button className="logout-btn" onClick={ () => logout() } >
                            Sair
                        </button>
                    </li>
                </ul>
            </div>
            
        </nav>
    );
}

export default Navbar;