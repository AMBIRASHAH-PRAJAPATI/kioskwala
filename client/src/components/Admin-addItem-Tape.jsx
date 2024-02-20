import { FaPlus } from "react-icons/fa";
import "./CSS/Admin-addItem-Tapse.css";

const AddItemBtn = ({ adduser, title }) => {
  return (
    <div id="addtape">
      <button className="button-37" role="button" onClick={adduser}>
      <FaPlus />  Add {title}
      </button>
    </div>
  );
};

export default AddItemBtn;
