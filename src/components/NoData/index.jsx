import './nodata.css';
import nothing from '../../img/no-data.png';

const NoData = ({message}) => {
    return ( 
        <div className="nodata-container">
            <img src={nothing} alt="resultado" />
            <h1>{ message ? message : 'Nenhum resultado encontrado' }</h1>
        </div>
     );
}
 
export default NoData;