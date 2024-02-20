// AdminBanks.js
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import GovernmentBanks from "../components/Admin-GvtBanks";
import PrivateBanks from "../components/Admin-PvtBanks";
import Swal from "sweetalert2";
import AddItemBtn from "../components/Admin-addItem-Tape";
import BankEditForm from "../components/Admin-UpdateBank"; // Assuming you have BankEditForm component
import BankAddForm from "../components/Admin-addBankForm"; // Assuming you have BankAddForm component
import { FaXmark } from "react-icons/fa6";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/admin/banks/add";

export const AdminBanks = () => {
  const [banks, setBanks] = useState({ govtBanks: [], pvtBanks: [] });
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const { AuthorizationToken } = useAuth();

  //close pop ups
  const closePopUp = () => {
    setShowPopup(false);
    setShowEditPopup(false);
    setShowAddPopup(false);
  };

  const getAllBanksData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/banks", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      setBanks(data);
    } catch (error) {
      console.error("Error fetching bank data:", error);
    } finally {
      setLoading(false);
    }
  };

//  adding bank to database
  const addBankToDatabase = async (BankData) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(BankData),
      });
      const res_data = await response.json();
      if (response.ok) {
        await getAllBanksData();
        toast.success("Bank added successfully");
        closePopUp();
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log(res_data);
        toast.error("Failed to add Bank");
      }
    } catch (error) {
      toast.error("Error adding Bank:", error);
      closePopUp();
    }
  };

  /// handel edit bank
  const editbank = async (BankData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/banks/update/${selectedBank._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: AuthorizationToken,
            "Content-Type": "application/json", // Ensure proper content type
          },
          body: JSON.stringify(BankData),
        }
      );
      if (response.ok) {
        await getAllBanksData();
        toast.success("Updated successfully");
        closePopUp();
      } else {
        toast.error("Bank not Updated");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      closePopUp();
    }
  };

  // handel dlt
  const handledlt = (id) => {
    Swal.fire({
      title: "Are you sure to delete Bank?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBank(id)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Bank has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting bank:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete bank..",
              icon: "error",
            });
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Bank deletion cancelled.",
          icon: "info",
        });
      }
    });
  };

  const deleteBank = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/banks/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      if (response.ok) {
        await getAllBanksData();
      }
    } catch (error) {
      console.error("Error deleting bank:", error);
    }
  };

  const addBankPopup = () => {
    setShowAddPopup(true);
    setShowPopup(true);
    document.body.classList.add("popup-open");
  };

  const openEditPopup = (bank) => {
    setSelectedBank(bank);
    setShowEditPopup(true);
    setShowPopup(true);
    document.body.classList.add("popup-open");
  };

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
        setShowPopup(false);
        setShowEditPopup(false);
        setShowAddPopup(false);
        document.body.classList.remove("popup-open");
      }
    });
  };

  useEffect(() => {
    getAllBanksData();
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
                <BankEditForm
                  Bank={selectedBank}
                  editbank={editbank}
                  onsave={() => {
                    setShowPopup(false);
                    setShowEditPopup(false);
                  }}
                />
              )}
              {showAddPopup && (
                <BankAddForm
                  onsave={() => {
                    setShowPopup(false);
                    setShowAddPopup(false);
                  }}
                  addBank={addBankToDatabase}
                />
              )}
            </div>
          </div>
        </>
      )}
      <section className="admin-main-sec">
        <AddItemBtn adduser={addBankPopup} title="Bank" />
        <div className="adminmainscroll">
          <div className="admin-main-pd">
            <h1>Admin Bank Data</h1>
          </div>
          <div className="admin-data">
            {loading ? (
              <Loader />
            ) : (
              <>
                <GovernmentBanks
                  banks={banks.govtBanks}
                  handledlt={handledlt}
                  openEditPopup={openEditPopup}
                />
                <PrivateBanks
                  banks={banks.pvtBanks}
                  handledlt={handledlt}
                  openEditPopup={openEditPopup}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminBanks;
