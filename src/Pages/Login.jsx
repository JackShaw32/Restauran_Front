import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import fondo from "../img/bg.svg";
import usuario from "../img/avatar.svg";
import "../css/style.css";
import { FaUser, FaLock } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { loginFetch } from "../api/loginFetch";

const Login = () => {
  const [formData, setFormData] = useState({
		email: 'luquita@Test.com',
		password: '123456Test',
	});
  // Desestructuring

  const focusFunc = (e) => {
    let parent = e.target.parentNode.parentNode;
    parent.classList.add("focus");
  }

  const blurFunc = (e) => {
    let parent = e.target.parentNode.parentNode;
    if (e.target.value.trim() === "") {
      parent.classList.remove("focus");
    }
  }

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);

      
      return () => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Complete todos los campos',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      })
      return
    }

    Swal.fire({
      title: 'Perfecto!',
      text: 'Datos Correctos',
      icon: 'success',
      confirmButtonText: 'OK'
    })

    try {
      const { access } = await loginFetch(formData)
      console.log(access)
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
  }

  return (
    <>
      <div className="bg-dark container-css">
        <div className="img">
          <img src={fondo} alt="img fondo" />
        </div>
        <div className="login-content">
          <form
            onSubmit={handleSubmit}
          >
            <img src={usuario} alt="avatar user" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <FaUser />
              </div>
              <div className="div">
                <h5>Email</h5>
                <input type="text"
                  className="input"
                  name="email"
                  onChange={handleChange}
                  value={formData.email} />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <FaLock />
              </div>
              <div className="div">
                <h5>Password</h5>
                <input type="password"
                  className="input"
                  name="password"
                  onChange={handleChange}
                  value={formData.password} />
              </div>
            </div>
            <Link to={'/'} className="a" href="##">Don't have an account?</Link>
            <input type="submit" className="btn-css" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;