import './nodata.css';
import nothing from '../../img/no-data.png';
import waitImg from '../../img/wait.png';

const NoData = ({message, wait = false}) => {
    return ( 
        <div className="nodata-container">
            <img src={wait ? waitImg : nothing } alt="resultado" />
            <h1>{ message ? message : 'Nenhum resultado encontrado' }</h1>
        </div>
     );
}
 
export default NoData;