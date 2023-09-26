import "./App.scss";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Footer from "./components/Footer/Footer";
import Gabs from "./pages/Gabs/Gabs";
import Home from "./pages/Home/Home";
import Loading from "../src/components/Loading/Loading";
import Login from "./pages/Login/Login";
import Navbar from "./components/NavBar/Navbar";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu";
import NotFound from "../src/pages/NotFound/NotFound";
import logo from "../src/assets/logo/logo.svg"
import Submit from "./pages/Submit/Submit";
import Welcome from "./pages/Welcome/Welcome";

import { useEffect, useState } from "react";
import { Navigate, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";

const App = () => {

  
  const location = useLocation();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ mgUserId, setMgUserId ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ level, setLevel ] = useState("");

  const [ showHowToPlay, setShowHowToPlay ] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL)

  const handleNavigateToHome = () => {
    setIsLoading(true);
    setLevel("");
    setTimeout (() => setIsLoading(false), 500)
  }

  const handlePleaseLogin = () => {
    toast('🙄 Please login to continue...');
  }

  const handleEnterUsername = () => {
    toast('🙄 Please enter Username...!', {
    toastId: 'pleaseEnterUsernameToast',});
  }

  const handleAlreadyOnHome = () => {
    if (showHowToPlay) {
      setShowHowToPlay(!showHowToPlay)
    }
    toast('🙄 Already on Home...!', {
    toastId: 'aleadyOnHomeToast',});
    setLevel("")
  }


  useEffect(() => {
    const getUser = () => {
      axios.get(`${BASE_URL}auth/login/success`, {
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
  }, [BASE_URL]);


  useEffect(() => {
    if (user) {
      setMgUserId(user.mgUserId);
    }
  }, [user]);

  if(isLoading) {
    return <Loading />
  }

  return (

    <>

      {user && 
      
        <HamburgerMenu 
          className="home__navBar"
          user={user} 
          setUser={setUser} 
          mgUserId={mgUserId}
          setLevel={setLevel}
          level={level}
          setIsLoading={setIsLoading}
          showHowToPlay={showHowToPlay}
          setShowHowToPlay={setShowHowToPlay}
        /> 
      }
        
      <Navbar 
        className="home__navBar"
        user={user} 
        level={level}
        setLevel={setLevel}
        setIsLoading={setIsLoading}
        showHowToPlay={showHowToPlay}
        setShowHowToPlay={setShowHowToPlay}
        />

      {user && user.userName
      
      ?

      <Link 
        className="mobile__homeButton"
        to="/home"
        onClick={location.pathname.includes('home') 
          ? handleAlreadyOnHome
          : handleNavigateToHome
          }>
          <img src={logo} alt="mobile home logo" />
      </Link>


      : user && !user.userName ?

      <Link 
        className="mobile__homeButton"
        onClick={handleEnterUsername}>
          <img src={logo} alt="mobile home logo" />
      </Link>

      :

      <Link 
        className="mobile__homeButton"
        onClick={handlePleaseLogin}>
          <img src={logo} alt="mobile home logo" />
      </Link>
      
      }

      <div className="appContainer">

        <Routes>
          
          {user && !user.userName

            ?
              <>
                <Route path="/*" element={<Navigate to="/welcome" />} />
                <Route path="/welcome" element={<Welcome setUser={setUser} mgUserId={mgUserId} setLevel={setLevel}/>} />
              </>
              
            : user ? 
            
            <>
              
              <Route path="/" element={<Navigate to="/home" />} />
              <Route 
                path="/home" 
                element={
                  <Home 
                    level={level}
                    setLevel={setLevel}
                    setShowHowToPlay={setShowHowToPlay}showHowToPlay={showHowToPlay}
                  />
                } 
              />
              <Route path="/gabs" element={<Navigate to="/home" />} />
              <Route path="/gabs/:level" element={<Gabs 
                setUser={setUser}   
                user={user} 
                mgUserId={mgUserId}
                setLevel={setLevel}
                />} />
              <Route path="/submit/" element={<Submit />} />
              <Route path="/login" element={<Navigate to="/home" />} />

              <Route path="/*" element={<Navigate to="/notfound" />} />
              <Route 
                path="/notfound" 
                element={<NotFound />} 
              />
            </>

            : // User doesn't exist

            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/home" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          }

        </Routes>
      </div>

      <Footer user={user} setUser={setUser} mgUserId={mgUserId}/>
        
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

    </>

  )};

export default App;