import Navbar from "./components/NavBar/Navbar";
import "./app.scss";
import Gabs from "./pages/Gabs/Gabs";
import Home from "./pages/Home/Home";
import Loading from "../src/components/Loading/Loading";
import Login from "./pages/Login/Login";
import NotFound from "../src/pages/NotFound/NotFound";
import Submit from "./pages/Submit/Submit";
import { BrowserRouter, Navigate, Routes, Route, useLocation  } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  // const handleHamburger = () => {
  //   setHamburgerIsOpen(!hamburgerIsOpen)
  // }

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


  if(isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
        

            <Navbar 
              className="home__navBar"
              user={user} 
            />

        <Routes>
        
          {user
            ?
            <>
              <Route path="/" element={<Navigate to="/home" />} />

              <Route path="/home" element={<Home />} />

              <Route path="/gabs" element={<Navigate to="/home" />} />

              <Route path="/gabs/:level" element={<Gabs />}/>

              <Route path="/submit/" element={<Submit />}/>

              <Route path="/login" element={<Navigate to="/home" />} />
            </>
              :
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/home" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Navigate to="/login"/>} />
            </>
          }

        </Routes>
    </BrowserRouter>
  )};

export default App;