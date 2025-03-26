import { useModal } from "../../context/Modal";


function DeleteConfirmation(){
const {closeModal} = useModal();

return(
<div>  
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to remove this spot from the listings?</p>
    <button onClick= {DeleteConfirmation}>Yes (Delete spot)</button>
    <button onClick= {closeModal}>No (Keep spot)</button>
</div> 

)
}



export default DeleteConfirmation;