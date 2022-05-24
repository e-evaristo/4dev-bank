import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";

import logo from '../../img/logo-wide.png';

import './login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wait, setWait] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const signin = async () => {
        try {
            setWait(true);
            await login(email, password);
            toast.success('Bem-vindo a plataforma!');
            navigate('/home');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setWait(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if (!email || regexEmail.test(email) === false) {
            toast.error('O e-mail informado não é válido');
            return;
        }

        if (password.length < 6) {
            toast.error('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        signin();

    };

    return (
        <div className="login-wrapper" >
            <form className="login-form" onSubmit={handleSubmit}>
                <p className="title"><img src={logo} alt="4DevBank" /></p>

                <input type="email"
                    className="form-control"
                    id="inputEmail1"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={wait}>
                    { wait ?  <span className="state">ENTRANDO...</span> : <span className="state">ENTRAR</span>  }
                </button>

            </form>
        </div>
    );
}

export default Login;