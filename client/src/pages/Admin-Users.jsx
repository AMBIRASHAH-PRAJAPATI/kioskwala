import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import UserEditForm from "../components/Admin-UpdateUser";
import UserAddForm from "../components/Admin-addUserForm";
import AddItemBtn from "../components/Admin-addItem-Tape";
import Swal from "sweetalert2";
import { FaXmark } from "react-icons/fa6";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

const URL = "http://localhost:5000/api/admin/users/add";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State for showing edit popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  const { AuthorizationToken } = useAuth();

  //close pop ups
  const closePopUp = () => {
    setShowPopup(false);
    setShowEditPopup(false);
    setShowAddPopup(false);
  };

  // get all user data
  const getAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Adding User to the databse through registration API call
  // add user
  const addUserToDatabase = async (userData) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(userData),
      });
      const res_data = await response.json();
      if (response.ok) {
        getAllUserData();
        toast.success("User added successfully");
        closePopUp();
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        toast.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      closePopUp();
    }
  };

  // Edit section
  const edituser = async (userData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${selectedUser._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: AuthorizationToken,
            "Content-Type": "application/json", // Ensure proper content type
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        await getAllUserData();
        toast.success("Updated successfully");
        closePopUp();
      } else {
        toast.error("User not Updated");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      closePopUp();
    }
  };

  // handel dlt
  const handleDlt = (id) => {
    Swal.fire({
      title: "Are you sure to delete User?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "The User has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete user.",
              icon: "error",
            });
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "User deletion cancelled.",
          icon: "info",
        });
      }
    });
  };

  // dlt user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      // const data = await response.json();
      if (response.ok) {
        getAllUserData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // popup
  const adduserPopup = () => {
    setShowAddPopup(true);
    setShowPopup(true);
    document.body.classList.add("popup-open");
  };

  //edit popup
  const openEditPopup = (user) => {
    setSelectedUser(user);
    setShowEditPopup(true);
    setShowPopup(true);
    document.body.classList.add("popup-open"); // Apply popup-open class to body
  };

  // close on Tap -> close
  const OnclosePopup = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
    }).then((result) => {
      if (result.isConfirmed) {
        closePopUp();
        document.body.classList.remove("popup-open");
      }
    });
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <>
      {showPopup && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup-container">
            <div className="popup-content">
              <span className="popup-close-btn" onClick={OnclosePopup}>
                <FaXmark />
              </span>
              {showEditPopup && (
                <UserEditForm
                  user={selectedUser}
                  edituser={edituser} // Remove the semicolon after edituser
                />
              )}
              {showAddPopup && <UserAddForm adduser={addUserToDatabase} />}
            </div>
          </div>
        </>
      )}
      <section className="admin-main-sec">
        <AddItemBtn adduser={adduserPopup} title="User" />
        <div className="adminmainscroll">
          <div className="admin-main-pd">
            <h1>Admin User Data</h1>
          </div>
          <div className="admin-data">
            {loading ? (
              <Loader />
            ) : (
              <div className="admin-main-pd">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Sn</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((curUser, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            <FaUser /> {curUser.username}
                          </td>
                          <td>{curUser.email}</td>
                          <td>{curUser.phone}</td>
                          <td>
                            <button
                              onClick={() => openEditPopup(curUser)}
                              className="admin-edit-btn"
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDlt(curUser._id)}
                              className="admin-dlt-btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
