import { useState } from "react";
import { useRouter } from "next/router";
import { saveToken, saveUser } from "./components/utils/storage";
import { baseUrl } from "./api/url";
import OffcanvasNav from "./components/_nav";
import Container from "react-bootstrap/Container";
import Footer from "./components/_footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[A-Za-z0-9._%+-]+@(?:stud\.)?noroff\.no$/;
    if (!email || !emailRegex.test(email)) {
      setEmailErrorMessage("Email must be a valid stud.noroff.no or noroff.no email address");
      return;
    } else {
      setEmailErrorMessage("");
    }

    if (!password || password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    setErrorMessage("");
    const url = baseUrl + "auction/auth/login";
    const data = JSON.stringify({ email: email, password: password });
    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      console.log("RESP1", response);
      const json = await response.json();
      console.log("JASON2", json);

      if (json.accessToken) {
        console.log("accessToken:", json.accessToken);
        saveToken(json.accessToken);
        saveUser(json);
        router.push(`/profile/${json.name}`);
      } else if (json.errors && json.errors.length > 0) {
        console.log("json.errors:", json.errors);

        const errorMessage = json.errors[0].message;
        setStatusCode(json.statusCode);
        setStatus(json.status);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.log("catch:", error);
      setErrorMessage(`POST ${url}  ${error}`);
    }
  };
  return (
    <>
      <OffcanvasNav></OffcanvasNav>
      <Container>
        <form className="form-signin w-50 m-auto my-5 pt-5" onSubmit={handleSubmit}>
          <div className="row mt-3">
            <label>
              Email:
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailErrorMessage("");
                }}
              />
            </label>
          </div>
          {emailErrorMessage && <p className="error">{emailErrorMessage}</p>}
          <div className="row mt-3">
            <label>
              Password:
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <div className="Form-error">
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <button className="w-100 btn btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
      </Container>
    </>
  );
}
