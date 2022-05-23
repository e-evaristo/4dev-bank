import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import ActionButton from '../../components/ActionButton';
import transferImg from '../../img/transaction.png'

import './operations.css';
import { toast } from 'react-toastify';
import { validarCPF } from '../../helpers/cpfFilter';

const Operations = () => {

    const [wait, setWait] = useState(false);
    /* const [transactiotype, setTransactiotype] = useState(''); */
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [transactionValue, setTransactionValue] = useState(1.00);

    const handleSubmit = () => {

        if (!sender || !validarCPF(sender)) {
            toast.error('O CPF do Remetente não é válido');
            return;
        }

        if (!recipient || !validarCPF(recipient)) {
            toast.error('O CPF do Destinatário não é válido');
            return;
        }

        if (!transactionValue || transactionValue <= 0) {
            toast.error('O valor da transação deve ser maior que zero');
            return;
        }

        setWait(true);
        axios.post('https://api-contas-trade4devs.herokuapp.com/conta/operacao', {
            /* transactiotype, */
            remetente: sender,
            destinatario: recipient,
            valor: transactionValue
        }).then(response => {
            toast.success(`Operação realizada com sucesso!`);
        }).catch(error => {
            toast.error(`${error.response.status} - ${error.response.data.message}`);
        }).finally(() => {
            setSender('');
            setRecipient('');
            setTransactionValue(1);
            setWait(false);
        });

    }

    return (
        <div className="operation-container">
            <div className="operation-topbar">
                <div className="operation-title">
                    <h1>Operações</h1>
                </div>
            </div>
            <div className="operation-form-inner">

                <div className="operation-form-left">
                    <img src={transferImg} alt="Transferências" />
                </div>

                <div className="operation-form">
                    <div className='form'>
                        {/* <div className="operation-input">
                            <label htmlFor="tipo">Tipo</label>
                            <select name='tipo'>
                                <option value="ENTRADA">ENTRADA</option>
                                <option value="SAIDA">SAÍDA</option>
                            </select>
                        </div> */}

                        <div className="operation-input">
                            <label htmlFor="remetente">CPF do Remetente *</label>
                            <InputMask id="remetente" mask="999.999.999-99" placeholder='CPF do Remetente *' value={sender} onChange={(e) => setSender(e.target.value)} />
                        </div>

                        <div className="operation-input">
                            <label htmlFor="destinatario">CPF do Destinatário *</label>
                            <InputMask id="destinatario" mask="999.999.999-99" placeholder='CPF do Destinatário *' value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                        </div>

                        <div className="operation-input">
                            <label htmlFor="value">Valor *</label>
                            <input type="number" id="value" step={0.1} min={1} value={transactionValue} onChange={(e) => setTransactionValue(e.target.value)} />
                        </div>

                        <div className="operation-form-btns">
                            <ActionButton action={() => handleSubmit()} wait={wait} text="Transferir" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Operations;