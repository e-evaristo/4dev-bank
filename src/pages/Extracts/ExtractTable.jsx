import { getLocaleDateBR } from "../../helpers/dateFilter";
import { getLocaleNumber } from "../../helpers/numberFilter";

const ExtractTable = ({extract}) => {
    
    let sum = 0;

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
                                sum += item.valor;
                                
                                return (
                                    <tr key={item._id}>
                                        <td>{item.tipo}</td>
                                        <td className="td-extract-date">{ getLocaleDateBR(item.data) }</td>
                                        <td className="td-extract-value">{ getLocaleNumber(item.valor) }</td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td colSpan={3} className="td-extract-total">TOTAL: { getLocaleNumber(sum) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default ExtractTable;