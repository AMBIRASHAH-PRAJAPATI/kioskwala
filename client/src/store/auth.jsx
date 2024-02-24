/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allBanks, setBanks] = useState([]);
  const AuthorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_BASE_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`Error fetching user data: ${error}`);
    }
  };

  // fetch banks from database
  const getAllBanks = async () => {
    try {
      setIsLoading(false);
      const govtBanksResponse = await fetch(`${API}/api/data/govtbanks`, {
        method: "GET",
      });

      const pvtBanksResponse = await fetch(`${API}/api/data/pvtbanks`, {
        method: "GET",
      });

      if (govtBanksResponse.ok && pvtBanksResponse.ok) {
        const govtBanksData = await govtBanksResponse.json();
        const pvtBanksData = await pvtBanksResponse.json();
        setBanks({ govtBanks: govtBanksData.msg, pvtBanks: pvtBanksData.msg });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error("Error fetching banks from the database");
      }
    } catch (error) {
      console.log(`Banks Frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getAllBanks();
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        allBanks,
        AuthorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};

// import { createContext, useContext, useEffect } from "react";
// import { useState } from "react";

// export const AuthContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState("");

//   const storeTokenInLS = (serverToken) => {
//     return localStorage.setItem("token", serverToken);
//   };

//   let isLoggedIn = !!token;
//   console.log("islogin", isLoggedIn);

//   //logout funtionality
//   const LogoutUser = () => {
//     setToken("");
//     return localStorage.removeItem("token");
//   };

//   // JWT Authentication -to get current logedin user data

//   const userAuthentication = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/user", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.ok) {
//       const data = await response.json();
//       setUser(data.userData);
//     }
//     } catch (error) {
//       console.log("Error fetching user data");
//     }
//   }

//   useEffect(() => {
//     userAuthentication();
//   },[]);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn,  storeTokenInLS, LogoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return authContextValue;
// };
