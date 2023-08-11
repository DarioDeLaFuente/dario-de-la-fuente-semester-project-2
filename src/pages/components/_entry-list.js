import React, { useState, useEffect } from "react";
import styles from "../../styles/scrollBarThumb.module.css";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GrowLoading from "../components/_border-grow";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

const formatDate = (dateString) => {
  const timestamp = Date.parse(dateString);
  if (isNaN(timestamp)) return "Invalid Date";

  const date = new Date(timestamp);
  return date.toLocaleString();
};

function entryListHandler({ user, entryList }) {
  const [entryListHandler, setentryListHandler] = useState([]);

  useEffect(() => {
    async function fetchListingData() {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        const res = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${user.name}/listings`,
          options
        );
        const data = await res.json();
        setentryListHandler(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }
    fetchListingData();
  }, [user, entryList]);

  const deleteEntry = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      await fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}`, options);
      setentryListHandler((prevList) => prevList.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  if (entryListHandler.length === 0) {
    return (
      <Row>
        <Col>
          <GrowLoading />
        </Col>
      </Row>
    );
  }

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {entryListHandler.map((entry, index) => (
          <Col key={index}>
            <Card className="card-conteiner-button">
              <img
                className="d-block entry-card-img"
                src={`${entry.media ? entry.media : placeholderImage}`}
                alt="card conteiner imge"
              />
              <Card.Body className="entry-card-box">
                <Card.Title>{entry.title}</Card.Title>
                <Card.Text>Tag:{entry.tags}</Card.Text>
                <Card.Text>Ends: {formatDate(entry.endsAt)}</Card.Text>
                <Card.Text>Bids: {entry._count.bids}</Card.Text>
                <span>
                  {" "}
                  <button className="card-button" onClick={() => deleteEntry(entry.id)}>
                    Delete
                  </button>
                </span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default entryListHandler;
