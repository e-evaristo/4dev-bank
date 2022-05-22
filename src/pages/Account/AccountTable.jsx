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
        <div>
            
            <div className="account-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
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
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telefone}</td>
                                    <td>{ getLocaleDateBR(item.dataNascimento) }</td>
                                    <td>{item.cpf}</td>
                                    <td>
                                        <Link to={`/account/${item._id}`}>
                                            <FaRegEdit size={16} color="#4D85EE" data-icon="edit" />
                                        </Link>
                                        <FaRegTrashAlt size={16} color="#DE3B3B" onClick={() => handleDelete(item)} />
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={6}>Nenhum registro encontrado</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default AccountTable;