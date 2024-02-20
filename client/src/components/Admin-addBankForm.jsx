// BankAddForm.js
import "./CSS/Admin-UpdateUser.css";
import Swal from "sweetalert2";
import { useState } from "react";

const BankAddForm = ({ onsave, addBank }) => {
  const [bankData, setBankData] = useState({
    name: "",
    logo: "",
    link: "",
    type: "government", // Default type is government, can be changed to "private"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        addBank(bankData); // Assuming this function correctly handles API call
        onsave();
      }
    });
  };

  return (
    <div className="user-edit-form-container">
      <div className="user-edit-form">
        <h2>Add Bank</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={bankData.type}
              onChange={handleChange}
            >
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bankData.name}
              onChange={handleChange}
              placeholder="Bank Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link:</label>
            <input
              type="text"
              id="link"
              name="link"
              value={bankData.link}
              onChange={handleChange}
              placeholder="Bank Website Link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo:</label>
            <input
              type="text"
              id="logo"
              name="logo"
              onChange={handleChange}
              placeholder="Bank Logo"
            />
          </div>
          <button type="submit" className="saveupdate-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankAddForm;




// import "./CSS/Admin-UpdateUser.css";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const BankAddForm = ({ onsave, addBank }) => {
//   const [bankData, setBankData] = useState({
//     name: "",
//     logo: null, // Initialize logo as null
//     link: "",
//     type: "government",
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     const updatedValue = name === "logo" ? files[0] : value;
//     setBankData((prevData) => ({
//       ...prevData,
//       [name]: updatedValue,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to save the changes.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, save it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const formData = new FormData();
//         formData.append("name", bankData.name);
//         formData.append("logo", bankData.logo);
//         formData.append("link", bankData.link);
//         formData.append("type", bankData.type);
//         addBank(bankData);
//         onsave();
//       }
//     });
//   };

//   return (
//     <div className="user-edit-form-container">
//       <div className="user-edit-form">
//         <h2>Add Bank</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="form-group">
//             <label htmlFor="type">Type:</label>
//             <select
//               id="type"
//               name="type"
//               value={bankData.type}
//               onChange={handleChange}
//             >
//               <option value="government">Government</option>
//               <option value="private">Private</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={bankData.name}
//               onChange={handleChange}
//               placeholder="Bank Name"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="link">Link:</label>
//             <input
//               type="text"
//               id="link"
//               name="link"
//               value={bankData.link}
//               onChange={handleChange}
//               placeholder="Bank Website Link"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="logo">Logo:</label>
//             <input
//               type="file"
//               id="logo"
//               name="logo"
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="saveupdate-btn">
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BankAddForm;
