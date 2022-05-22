import { CgSpinner } from 'react-icons/cg';

import './actionbutton.css';

const ActionButton = (props) => {

    const handleClick = () => {
        alert('Nenhuma ação definida');
        return;
    }

    return ( 
        <button 
            className='actionButton' 
            onClick={props.action ?? handleClick}
            disabled={props.wait}>

                { props.wait && <div className="wait-animation"><CgSpinner /></div>  }
                <span>{props.text ?? 'Salvar'}</span>
                { props.children && <div className="inner">{ props.children }</div> }

        </button>
     );
}
 
export default ActionButton;