import "./App.scss";

import Footer from "./components/Footer/Footer";
import Gabs from "./pages/Gabs/Gabs";
import Home from "./pages/Home/Home";
import Loading from "../src/components/Loading/Loading";
import Login from "./pages/Login/Login";
import Navbar from "./components/NavBar/Navbar";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu";
import NotFound from "../src/pages/NotFound/NotFound";
// import Submit from "./pages/Submit/Submit";
import Submit from "./pages/Submit/Submit";
import Welcome from "./pages/Welcome/Welcome";
import SubmitGab from "../src/components/SubmitGab/SubmitGab";

import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitGab, setShowSubmitGab] = useState(false);
  const [mgUserId, setMgUserId] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error("User not found"); 
        }
      })
      .then((resObject) => {
        setUser(resObject.user);
        setMgUserId(resObject.user.mgUserId)
        setIsLoading(false)
      })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
        .finally(() => {
          setIsLoading(false); 
        });
      };
      getUser();
  }, []);


  useEffect(() => {
    if (user) {
      setMgUserId(user.mgUserId)
    }
  }, [user]);

  if(isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      
      <HamburgerMenu />

      {showSubmitGab && 

        <SubmitGab 
          setShowSubmitGab={setShowSubmitGab}
          showSubmitGab={showSubmitGab}
        />
      }


      <Navbar 
        className="home__navBar"
        user={user} 
        setShowSubmitGab={setShowSubmitGab}
        showSubmitGab={showSubmitGab}
      />

      <Routes>
        
        {user && !user.userName

          ?
            <>
              <Route path="/*" element={<Navigate to="/welcome" />} />
              <Route path="/welcome" element={<Welcome setUser={setUser} mgUserId={mgUserId} />} />
            </>
            
          : user ? // user exists and has a userName

          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/gabs" element={<Navigate to="/home" />} />
            <Route path="/gabs/:level" element={<Gabs setUser={setUser} user={user} mgUserId={mgUserId}/>} />
            <Route path="/submit/" element={<Submit />} />
            <Route path="/login" element={<Navigate to="/home" />} />
          </>

          : // User doesn't exist

          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login setUser={setUser} user={user} />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        }

      </Routes>
      <Footer user={user} setUser={setUser} mgUserId={mgUserId}/>
    </BrowserRouter>
  )};

export default App;