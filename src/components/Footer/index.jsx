import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <ul className='social-list'>
                    <li><FaFacebook /></li>
                    <li><FaInstagram /></li>
                    <li><FaLinkedin /></li>
                </ul>
                <p><span>4DevBank</span> &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
 
export default Footer;