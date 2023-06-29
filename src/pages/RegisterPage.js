import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { saveUser } from "../pages/utils/storage";
import displayMessage from "../pages/components/_displayMessage";
import { MdGavel } from "react-icons/md";
import OffcanvasNav from "./components/_nav";
import Footer from "./components/_footer";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[\w]+$/;
    if (!name || !nameRegex.test(name)) {
      setNameErrorMessage("Name must not contain punctuation symbols apart from underscore (_)");
      return;
    } else {
      setNameErrorMessage("");
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@(?:stud\.)?noroff\.no$/;
    if (!email || !emailRegex.test(email)) {
      setEmailErrorMessage("Email must be a valid stud.noroff.no or noroff.no email address");
      return;
    } else {
      setEmailErrorMessage("");
    }

    if (!password || password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters");
      return;
    } else {
      setPasswordErrorMessage("");
    }

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const json = await response.json();
        console.log("JASON user", json);
        router.push(`/SuccessfullyRegisteredPage`);
        console.log("JASON user", json);
      } else {
        const json = await response.json();
        console.log("json.errors:", json.errors);
        const errorMessage = json.errors[0].message;
        setStatusCode(json.statusCode);
        setStatus(json.status);
        setErrorMessage(errorMessage);
      }
    } catch (errors) {
      console.log("fetch error:", errors);
    }
  };
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <div className="menu-container"></div>
        <OffcanvasNav />
      </header>
      <main className="w-100 d-flex justify-content-center my-5 pt-5">
        <form
          id="register-form"
          className="form-signin w-50 m-auto my-5 pt-5"
          onSubmit={handleSubmit}
        >
          <MdGavel />
          <h1 className="h3 mb-3 fw-normal">Register</h1>
          <div className="massage-container"></div>
          <div className="form-floating mt-3">
            <input
              name="name"
              type="name"
              className="form-control"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameErrorMessage("");
              }}
            />
            <label htmlFor="name">Name</label>
            {nameErrorMessage && <p className="error">{nameErrorMessage}</p>}
          </div>
          <div className="form-floating mt-3">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErrorMessage("");
              }}
            />
            <label htmlFor="email">Email address</label>
            {emailErrorMessage && <p className="error">{emailErrorMessage}</p>}
          </div>
          <div className="form-floating mt-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErrorMessage("");
              }}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="Form-error">
            {passwordErrorMessage && <p className="error">{passwordErrorMessage}</p>}
          </div>
          <div className="Form-error">
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <button type="submit" className="w-100 btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
