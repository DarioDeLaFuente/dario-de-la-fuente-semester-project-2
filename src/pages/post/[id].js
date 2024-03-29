import Head from "next/head";
import { useRouter } from "next/router";
import { baseUrl } from "../api/url";
import { useEffect, useState } from "react";
import {
  isLoggedIn,
  getFromStorage,
  saveToStorage,
  getToken,
  userKey,
  saveUser,
} from "../../utils/storage";
import OffcanvasNav from "../components/_nav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import BidsList from "../components/_bids-list";
import Footer from "../components/_footer";
import img from "../../styles/PostCardImg.module.css";
import des from "../../styles/cardDescription.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import error from "../../styles/error.module.css";
import success from "../../styles/success.module.css";
import bidButton from "../../styles/bidButton.module.css";
import Placeholder from "react-bootstrap/Placeholder";

const placeholderImage =
  "https://raw.githubusercontent.com/DarioDeLaFuente/dario-de-la-fuente-semester-project-2/main/public/placeholderSP2.png";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bidError, setBidError] = useState(null);
  const [post, setPost] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  const formatDate = (dateString) => {
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) return "Invalid Date";

    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const fetchProfile = async () => {
    const storedUser = getFromStorage("user");
    const options = {
      headers: {
        Authorization: `Bearer ${storedUser.accessToken}`,
      },
    };
    const res = await fetch(
      `https://api.noroff.dev/api/v1/auction/profiles/${storedUser.name}`,
      options
    );
    const data = await res.json();
    saveUser(data);
  };

  async function fetchPost() {
    try {
      const res = await fetch(`${baseUrl}auction/listings/${id}?_bids=true`);
      if (!res.ok) {
        throw new Error("Failed to fetch post data");
      }
      const data = await res.json();
      setPost(data);
    } catch (error) {
      setError(error);
    }
  }
  useEffect(() => {
    if (id) {
      fetchPost();
      setLoggedIn(isLoggedIn());
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const [bidAmount, setBidAmount] = useState(0);
  const [bidStatus, setBidStatus] = useState(null);

  const handleBid = async (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      router.push("/LoginPage");
      return;
    }

    try {
      const token = getToken();
      const res = await fetch(`${baseUrl}auction/listings/${id}/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: bidAmount }),
      });
      const json = await res.json();

      if (json.id) {
        setBidError("Thank you for your bid.");
        fetchProfile();
        setErrorMessage("");
        setBidStatus(Date.now());
        return;
      } else if (json.errors && json.errors.length) {
        const error = json.errors[0].message;
        setErrorMessage(error);
        setBidError("");
      }

      const user = getFromStorage(userKey);
      if (user) {
        user.credits = user.credits - bidAmount;
        saveToStorage(userKey, user);
      }
    } catch (error) {
      setBidError(`Error: ${error.message}`);
    }
  };
  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id, bidStatus]);

  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholderImage;
  };

  return (
    <>
      <Head>
        <title>Unsigned Market</title>
        <meta name="description" content="Generated by Unsigned Market" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OffcanvasNav userCredits={post.credits} />
      <Container>
        <Card>
          <Card.Body>
            <Row className="justify-content-md-center">
              <Col xs={12} md={8}>
                <div className={img.imgConteiner}>
                  <Card.Img
                    className={img.cardImgSize}
                    variant="top"
                    alt={`${
                      "A description off the imge " + post.description
                        ? "A description off the imge " + post.description
                        : "The user the not add a description off the imge"
                    }`}
                    src={`${post.media ? post.media : placeholderImage}`}
                    onError={handleImageError}
                  />
                </div>
              </Col>
              <Col xs={12} md={4}>
                <h2 className={des.titleDescription}>
                  {!post.title && <Placeholder xs={4} />} {post.title}
                </h2>
                <span className={des.description}>
                  Description:
                  <p className={des.txtDescription}>
                    {!post.description && (
                      <>
                        <Placeholder xs={6} size="lg" /> <Placeholder xs={6} size="lg" />
                      </>
                    )}
                    {post.description}
                  </p>
                </span>
                <span className={des.description}>
                  Id:
                  <p className={des.txtDescription}>
                    {!post.id && (
                      <>
                        <Placeholder xs={6} size="lg" />
                        <Placeholder xs={6} size="lg" />
                      </>
                    )}
                    {post.id}
                  </p>
                </span>
                <span className={des.description}>
                  Bid amount:
                  <p className={des.txtDescription}>
                    {!post._count && (
                      <>
                        <Placeholder xs={6} size="lg" />
                        <Placeholder xs={6} size="lg" />
                      </>
                    )}
                    {post._count && post._count.bids}
                  </p>
                </span>
                <div className={des.desBox}>
                  Listing info:
                  <p className={des.txtBoxDescription}>
                    <span>Created: </span>
                    {!post.created && (
                      <>
                        <Placeholder xs={6} size="lg" />
                        <Placeholder xs={6} size="lg" />
                      </>
                    )}
                    {formatDate(post.created)}
                  </p>
                  <p className={des.txtBoxDescription}>
                    <span>Ends At: </span>
                    {!post.endsAt && (
                      <>
                        <Placeholder xs={6} size="lg" />
                        <Placeholder xs={6} size="lg" />
                      </>
                    )}
                    {formatDate(post.endsAt)}
                  </p>
                </div>
                <span className={des.description}>
                  Last updated:
                  <p className={des.txtDescription}>
                    {!post.updated && (
                      <>
                        <Placeholder xs={6} size="lg" />
                        <Placeholder xs={6} size="lg" />
                      </>
                    )}
                    {formatDate(post.updated)}
                  </p>
                </span>
                {post && (
                  <>
                    {loggedIn ? (
                      <>
                        <Form className="mt-3" onSubmit={handleBid}>
                          {errorMessage && <div className={error.errorMessage}>{errorMessage}</div>}
                          {bidError && <div className={success.success}>{bidError}</div>}
                          <InputGroup className={img.inputgroup}>
                            <Form.Control
                              type="number"
                              value={bidAmount}
                              onChange={(e) => setBidAmount(Number(e.target.value))}
                              className={img.input}
                              placeholder="Bid Amount"
                            />
                            <Button className={bidButton.bidButton} variant="" type="submit">
                              Bid
                            </Button>
                          </InputGroup>
                        </Form>
                      </>
                    ) : (
                      <Button
                        href="/LoginPage"
                        className="mt-3"
                        variant="outline-primary"
                        key="login"
                      >
                        Login
                      </Button>
                    )}
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}></Col>
              <Col xs={12} md={12} className="mt-3">
                {" "}
                <BidsList bids={post.bids}></BidsList>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Post;
