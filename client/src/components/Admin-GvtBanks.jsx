// GovernmentBanks.js
import { Link } from "react-router-dom";

const GovernmentBanks = ({ banks, handledlt, openEditPopup }) => {
  return (
    <div className="admin-main-pd">
      <h2>Government Banks</h2>
      <table className="admin-data-table">
        <thead>
          <tr>
            <th>Sn</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((curBank, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{curBank.name}</td>
              <td>
                <button
                  onClick={() => openEditPopup(curBank)}
                  className="admin-edit-btn"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handledlt(curBank._id)}
                  className="admin-dlt-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernmentBanks;
