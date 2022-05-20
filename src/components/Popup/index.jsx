import './popup.css';

const Popup = (props) => {
    return ( props.trigger ) ? (
        <>
        <div className="popup">
            <div className="popup-container">
                <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
                { props.children }
            </div>
        </div>
        </>
     ) : "";
}
 
export default Popup;