import zzz from '../../img/zzz.gif';

import './container.css';

const Container = (props) => {
    return ( 
        props.wait ? <div className='waitBox'><span><img src={zzz} alt="..." /> Aguarde... Carregando...</span></div>
        :
        <div className={`${'container'} ${props.customClass}`}>
            { props.children }
        </div>
    );
}
 
export default Container;