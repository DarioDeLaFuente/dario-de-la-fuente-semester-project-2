import React, { useState, useEffect } from "react";
import styles from "../../styles/scrollBarThumb.module.css";
import Carousel from "react-bootstrap/Carousel";

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
    return <p>Loading...</p>;
  }

  return (
    <Carousel className={styles.carouselContainer}>
      {entryListHandler.map((entry, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`${entry.media ? entry.media : placeholderImage}`}
            alt="First slide"
          />
          <Carousel.Caption key={entry.id}>
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
            <p>{entry.tags}</p>
            <p>{entry._count.bids}</p>
            <p>{entry.endsAt}</p>
            <span>
              {" "}
              <button onClick={() => deleteEntry(entry.id)}>Delete</button>
            </span>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default entryListHandler;
