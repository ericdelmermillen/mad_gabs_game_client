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
import logo from "../src/assets/logo/logo.svg"
import Submit from "./pages/Submit/Submit";
import Welcome from "./pages/Welcome/Welcome";
import SubmitGab from "../src/components/SubmitGab/SubmitGab";

import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitGab, setShowSubmitGab] = useState(false);
  const [mgUserId, setMgUserId] = useState(null);

  useEffect(() => {
    console.log("getUser")
    const getUser = () => {
      axios.get("http://localhost:5000/auth/login/success", {
        withCredentials: true,
      })
      .then((response) => {

        if (response.status === 200) {
          return response.data
        } else {
          throw new Error("User not found"); 
        }
      })
      .then((resObject) => {
        setUser(resObject.user);
        setMgUserId(resObject.user.mgUserId)
        sessionStorage.setItem('token', resObject.token);

        setTimeout(() => {
          setIsLoading(false);
        }, 500); 
      })
        .catch((err) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 500); 
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 500); 
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

      {user && 
      
        <HamburgerMenu 
          className="home__navBar"
          showSubmitGab={showSubmitGab}
          setShowSubmitGab={setShowSubmitGab}
          user={user} 
          setUser={setUser} mgUserId={mgUserId}
          mgUserId={mgUserId}
          /> 
        }
        
        
      <Navbar 
        className="home__navBar"
        user={user} 
        setShowSubmitGab={setShowSubmitGab}
        showSubmitGab={showSubmitGab}
        />

      <Link className="mobile__homeButton"
      to="/home"
      >
        <img src={logo} alt="" />
      </Link>
        
      {showSubmitGab && 
  
          <SubmitGab 
            setShowSubmitGab={setShowSubmitGab}
            showSubmitGab={showSubmitGab}
      />}

    <div className="appContainer">

      <Routes>
        
        {user && !user.userName

          ?
            <>

              <Route path="/*" element={<Navigate to="/welcome" />} />
              <Route path="/welcome" element={<Welcome setUser={setUser} mgUserId={mgUserId} />} />
            </>
            
          : user ? 
          
          <>
            
            <Route path="/" element={<Navigate to="/home" />} />
            <Route 
              path="/home" 
              element={<Home />} 
            />
            <Route path="/gabs" element={<Navigate to="/home" />} />
            <Route path="/gabs/:level" element={<Gabs 
              setUser={setUser}   
              user={user} 
              mgUserId={mgUserId}/>} />
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
      </div>
      <Footer user={user} setUser={setUser} mgUserId={mgUserId}/>
    </BrowserRouter>
  )};

export default App;