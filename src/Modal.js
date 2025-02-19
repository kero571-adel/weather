import './Modal.css';
export default function Modal({view,message}){
    return(
    <div class="warning-general" style={{display:view}}>
        <div class="confirm-div">
            <p>
            <strong>{message}</strong>
            </p>
            <div class="modals-container">
                <button class="green-btn" onClick={()=>{
                    window.location.reload();
                }}>ok</button>
            </div>
        </div>
    </div>
    )
}