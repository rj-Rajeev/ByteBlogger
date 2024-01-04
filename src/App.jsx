import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login as authLogin } from "./services/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(authLogin({ userData }));
    }
  }, []);
  return (
    <> 
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
