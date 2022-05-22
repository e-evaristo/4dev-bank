import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import ActionButton from '../../components/ActionButton';
import { GrTransaction } from 'react-icons/gr';

import './operations.css';
import { toast } from 'react-toastify';

const Operations = () => {

    const [wait, setWait] = useState(false);
    /* const [transactiotype, setTransactiotype] = useState(''); */
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [transactionValue, setTransactionValue] = useState(0);

    const handleSubmit = () => {
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
            setTransactionValue(0);
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
            <div className="operation-form">
                <h3>Transferência</h3>
                <div className='form'>
                    {/* <div className="operation-input">
                        <label htmlFor="tipo">Tipo</label>
                        <select name='tipo'>
                            <option value="ENTRADA">ENTRADA</option>
                            <option value="SAIDA">SAÍDA</option>
                        </select>
                    </div> */}

                    <div className="operation-input">
                        <label htmlFor="remetente">CPF do Remetente</label>
                        <InputMask id="remetente" mask="999.999.999-99" placeholder='CPF do Remetente *' value={sender} onChange={(e) => setSender(e.target.value)} />
                    </div>

                    <div className="operation-input">
                        <label htmlFor="destinatario">CPF do Destinatário</label>
                        <InputMask id="destinatario" mask="999.999.999-99" placeholder='CPF do Destinatário *' value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                    </div>

                    <div className="operation-input">
                        <label htmlFor="value">Valor</label>
                        <input type="number" id="value" step={0.1} min={1} value={transactionValue} onChange={(e) => setTransactionValue(e.target.value)} />
                    </div>

                    <div className="operation-form-btns">
                        <ActionButton action={() => handleSubmit()} wait={wait} text="Transferir">
                            <GrTransaction color='#FFFFFF'  />
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Operations;