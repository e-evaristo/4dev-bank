import { getLocaleDateTimeBR } from "../../helpers/dateFilter";
import { getLocaleNumber } from "../../helpers/numberFilter";
import { FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';

const ExtractTable = ({extract}) => {
    
    let income = 0;
    let outcome = 0;

    return ( 
        <div>
            
            <div className="extract-list">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            extract.map(item => {
                                income += item.tipo === 'ENTRADA' ? item.valor : 0;
                                outcome += item.tipo === 'SAIDA' ? item.valor : 0;
                                
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            {
                                                item.tipo === 'ENTRADA' ?
                                                    <span className="operation income">ENTRADA <FaCaretSquareUp /></span>
                                                :
                                                    <span className="operation outcome">SAÍDA <FaCaretSquareDown /></span>
                                            }
                                        </td>
                                        <td className="td-extract-date">{ getLocaleDateTimeBR(item.data) }</td>
                                        <td className="td-extract-value">{ getLocaleNumber(item.valor) }</td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td colSpan={3} className="td-extract-total">TOTAL: { getLocaleNumber(income - outcome) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ExtractTable;