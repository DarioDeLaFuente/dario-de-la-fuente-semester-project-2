import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TbGavel } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { clearStorage, saveUser } from "../../utils/storage";
import { getFromStorage } from "../../utils/storage";
import Card from "react-bootstrap/Card";
import styles from "../../styles/LogoBaner.module.css";

const OffcanvasNav = ({ userCredits }) => {
  const router = useRouter();
  const [name, setUsername] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [credits, setCredits] = useState(null);

  const handleLogout = () => {
    clearStorage();
    router.push("/");
  };

  useEffect(() => {
    const user = getFromStorage("user");
    if (user && user.name) {
      setUsername(user.name);
      setUserEmail(user.email);
      setCredits(user.credits);

      saveUser({
        name: user.name,
        email: user.email,
        credits: user.credits,
      });
    }
  }, []);

  const getUpdateFromStorage = () => {
    const user = getFromStorage("user");
    console.log("getUpdateFromStorage", user);
    if (user && user.name) {
      setUsername(user.name);
      setUserEmail(user.email);
      setCredits(user.credits);
    }
  };

  useEffect(() => {
    const navbarToggleHandler = () => {
      getUpdateFromStorage();
    };

    const navbar = document.querySelector(".navbar");

    if (navbar) {
      navbar.addEventListener("shown.bs.offcanvas", navbarToggleHandler);
    }

    return () => {
      if (navbar) {
        navbar.removeEventListener("shown.bs.offcanvas", navbarToggleHandler);
      }
    };
  }, []);

  return (
    <>
      {[false].map((expand, index) => (
        <Navbar onToggle={getUpdateFromStorage} key={index} expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
              UnsignedMarket <TbGavel className={styles.logoBrand} />
              <Navbar.Text className={styles.brandSlogen}>The Market of Opportunities.</Navbar.Text>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Nav.Link href="/">
                    UnsignedMarket <TbGavel className={styles.logoBrand} />
                    <Navbar.Text className={styles.brandSlogen}>
                      The Market of Opportunities.
                    </Navbar.Text>
                  </Nav.Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {name ? (
                    <>
                      <Nav.Link href={`/profile/${name}`}>
                        <FaUserCircle /> Profile
                      </Nav.Link>

                      <Card>
                        <Card.Body>
                          <Card.Title>{name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{userEmail}</Card.Subtitle>
                          <Card.Text>Credits: {credits}</Card.Text>
                        </Card.Body>
                      </Card>
                      <Nav.Link href="/" onClick={handleLogout}>
                        Log out
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/infoPage">
                        <FcAbout /> Your Ultimate Guide
                      </Nav.Link>
                      <Nav.Link href="/LoginPage">Log in</Nav.Link>
                      <Nav.Link href="/RegisterPage">Register</Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default OffcanvasNav;
