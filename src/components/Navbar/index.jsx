import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuFill } from 'react-icons/ri';
import { AuthContext } from "../../contexts/auth";

import logo from '../../img/logo-wide.png';

import './navbar.css';

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    const [menuOpen, setMenuOpen] = useState(true);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-top-bar">
                    <Link to="/home" className="logo"><img src={logo} alt="4DevBank" /></Link>
                    <RiMenuFill color="#FFF" size={28} onClick={() => setMenuOpen(!menuOpen)} />
                </div>
                
                    <ul className={ menuOpen ? 'list':'list-open' }>
                        <li className="item" onClick={() => setMenuOpen(true)}><Link to="/home">Home</Link></li>
                        <li className="item" onClick={() => setMenuOpen(true)}><Link to="/accounts">Contas</Link></li>
                        <li className="item" onClick={() => setMenuOpen(true)}><Link to="/balances">Saldo</Link></li>
                        <li className="item" onClick={() => setMenuOpen(true)}><Link to="/extracts">Extrato</Link></li>
                        <li className="item" onClick={() => setMenuOpen(true)}><Link to="/operations">Operações</Link></li>
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