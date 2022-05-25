import axios from "axios";
import { useState } from "react";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validateAccountFields from "../../helpers/newAccountsValidation";

import logo from '../../img/logo-wide.png';

import './guestnewaccount.css';

const GuesNewAccount = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [wait, setWait] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            setWait(true);
            validateAccountFields(name, email, phone, dob, cpf, password);

            axios.post('https://api-contas-trade4devs.herokuapp.com/conta', {
                nome: name,
                email,
                telefone: phone,
                dataNascimento: dob,
                cpf,
                senha: password
            }).then(response => {
                toast.success('Conta criada com sucesso!');
                navigate('/');
            }).catch(error => {
                toast.error('Erro ao criar conta. Tente novamente mais tarde.');
            });


        } catch (error) {
            toast.error(error.message);
        } finally {
            setWait(false);
        }
        
    }

    return ( 
        <div className="guest-wrapper" >
            <form className="guest-form" onSubmit={handleSubmit}>
                <p className="title"><img src={logo} alt="4DevBank" /></p>
                <p className="subtitle">Abra sua conta de onde estiver e já comece a usar</p>

                <div className="guest-form-inputs">
                    <input type="text" 
                        id="inputName" 
                        className="form-control" 
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input type="email"
                        className="form-control"
                        id="inputEmail1"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="guest-form-inputs">
                    <InputMask 
                        id="phone" 
                        mask="(99)99999-9999" 
                        placeholder='Telefone' 
                        value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <InputMask 
                        id="dob" 
                        mask="99/99/9999" 
                        placeholder='Data de Nascimento' 
                        value={dob} onChange={(e) => setDob(e.target.value)} />   
                </div>

                <div className="guest-form-inputs">
                    <InputMask 
                        id="cpf" 
                        mask="999.999.999-99" 
                        placeholder='CPF' 
                        value={cpf} onChange={(e) => setCpf(e.target.value)} />                 

                    <input type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="guest-form-btns">
                    <button type="button" disabled={wait} onClick={() => navigate('/')}>
                        { wait ?  <span className="state">AGUARDE...</span> : <span className="state">JÁ TENHO CONTA</span>  }
                    </button>

                    <button type="submit" disabled={wait}>
                        { wait ?  <span className="state">AGUARDE...</span> : <span className="state">CRIAR CONTA</span>  }
                    </button>
                </div>

            </form>
        </div>
     );
}
 
export default GuesNewAccount;