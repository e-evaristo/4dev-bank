import { useState } from 'react';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import { validarCPF } from '../../helpers/cpfFilter';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

import './account.css';
import { formatStringDate } from '../../helpers/dateFilter';

const AccountForm = () => {

    const { _id } = useParams();
    const [id, setId] = useState(_id);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [dob, setDob] = useState('');

    const [wait, setWait] = useState(false);

    const navigate = useNavigate();

    const handlerError = (msg) => {
        toast.error(msg);
        setTimeout(() => {
            setWait(false);
        }, 200);
    }

    const loadData = async () => {
        await axios.get(`https://api-contas-trade4devs.herokuapp.com/conta/${id}`)
            .then(response => {
                const { nome, email, telefone, cpf, dataNascimento } = response.data;
                setName(nome);
                setEmail(email);
                setPhone(telefone);
                setCpf(cpf);
                setDob(formatStringDate(dataNascimento));
            })
            .catch(error => {
                toast.error(`${error.response.status} - Erro ao carregar dados da conta`);
            }
        );
    }

    if (id) {
        loadData();
    }

    const handleSubmit = () => {

        setWait(true);

        if (name.length < 3) {
            handlerError('Preecha o campo Nome.');
            return;
        }
        const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!email || regexEmail.test(email) === false) {
            handlerError('O e-mail informado não é válido');
            return;
        }
        const regexPhone = /^\([1-9]{2}\)[1-9]{0,1}[1-9]{1}[0-9]{3}-[0-9]{4}$/;
        if (!phone || regexPhone.test(phone) === false) {
            handlerError('Informe o telefone com DDD');
            return;
        }
        const regexDob = /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[0-2])\1(?:19|20)\d\d$/;
        if (!dob || regexDob.test(dob) === false) {
            handlerError('Data de nascimento inválida');
            return;
        }
        if (!cpf || !validarCPF(cpf)) {
            handlerError('O CPF informado não é válido');
            return;
        }
        if (password.length < 6) {
            handlerError('A senha deve conter no mínimo 6 caracteres');
            return;
        }

        axios.post('https://api-contas-trade4devs.herokuapp.com/conta', {
            nome: name,
            email,
            senha: password,
            telefone: phone,
            dataNascimento: formatStringDate(dob),
            cpf,
        }).then(response => {
            toast.success('Conta criada com sucesso!');
            navigate('/accounts');
        }).catch(error => {
            handlerError(`Ocorreu um erro ao tentar cadastrar o usuário: ${error.response.data.message}`);
        });
        
    }

    return (
        
        <div className="account-form">
            <h1>Cadastrar Conta</h1>
            <form>
                <div className="account-input">
                    <label htmlFor="name">Nome</label>
                    <input type="hidden" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                    <input type="text" id="name" placeholder='Nome Completo *' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="account-input">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder='E-mail *' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="account-input">
                    <label htmlFor="phone">Telefone</label>
                    <InputMask id="phone" mask="(99)99999-9999" placeholder='Telefone *' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="account-input">
                    <label htmlFor="phone">Data de Nascimento</label>
                    <InputMask id="dob" mask="99/99/9999" placeholder='Data de Nascimento *' value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>

                <div className="account-input">
                    <label htmlFor="cpf">CPF</label>
                    <InputMask id="cpf" mask="999.999.999-99" placeholder='CPF *' value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>

                <div className="account-input">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder='Senha *' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="account-form-btns">
                    <button type='button' onClick={() => {navigate('/accounts')}}>
                        <span>Voltar</span>
                    </button>

                    <button type='button' onClick={handleSubmit} disabled={wait}>
                        {wait && <CgSpinner />}
                        <span>Salvar</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountForm;