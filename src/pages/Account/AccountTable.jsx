import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getLocaleDateBR } from "../../helpers/dateFilter";
import { toast } from 'react-toastify';

const AccountTable = ({items}) => {

    /* const [editItem, setEditItem] = useState(null);

    const handleEdit = (item) => {
        console.log(item);
    } */

    const handleDelete = (item) => {
        if (window.confirm('Deseja realmente excluir este registro?')) {
            toast(`A Conta de ${item.nome} será excluída!`);
        }
    }

    return ( 
        <>
            <div className="account-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome / Email</th>
                            <th>Telefone</th>
                            <th>Data Nasc.</th>
                            <th>CPF</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length > 0 ?
                            
                            items.map(item => (
                                <tr key={item._id}>
                                    <td data-label="Nome:  ">
                                        {item.nome} <br />
                                        <span className='email'>{item.email}</span>
                                    </td>
                                    <td data-label="Telefone: ">{item.telefone}</td>
                                    <td data-label="Data Nasc.: ">{ getLocaleDateBR(item.dataNascimento) }</td>
                                    <td data-label="CPF: ">{item.cpf}</td>
                                    <td data-label="">
                                        <Link to={`/account/${item._id}`}>
                                            <FaRegEdit size={16} color="#4D85EE" data-icon="edit" />
                                        </Link>
                                        <FaRegTrashAlt size={16} color="#DE3B3B" onClick={() => handleDelete(item)} />
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={5}>Nenhum registro encontrado</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
     );
}
 
export default AccountTable;