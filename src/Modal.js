import './Modal.css';
export default function Modal({view,message}){
    return(
    <div className="warning-general" style={{display:view}}>
        <div className="confirm-div">
            <p>
            <strong>{message}</strong>
            </p>
            <div className="modals-container">
                <button className="green-btn" onClick={()=>{
                    window.location.reload();
                }}>ok</button>
            </div>
        </div>
    </div>
    )
}