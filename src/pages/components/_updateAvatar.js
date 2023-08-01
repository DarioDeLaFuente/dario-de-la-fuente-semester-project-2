import { baseUrl } from "../api/url";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { getUsername, getToken } from "../../utils/storage";
import styles from "../../styles/profileCard.module.css";
import error from "../../styles/errorMessage.module.css";
import success from "../../styles/success.module.css";

const UpdateAvatar = ({ onAvatarUpdated }) => {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handelAvatarSubmit = async (event) => {
    event.preventDefault();

    if (!isValidUrl(link)) {
      setLinkError("Invalid URL. Please enter a valid URL starting with 'http://' or 'https://'.");
      setSuccessMessage("");
      return;
    }

    const token = getToken();
    const user = getUsername();
    try {
      const res = await fetch(`${baseUrl}auction/profiles/${user}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: link }),
      });

      if (res.ok) {
        setLink("");
        setLinkError("");
        setSuccessMessage("Avatar updated successfully!");
        onAvatarUpdated(link);
      } else {
        console.log("Error", res);
        const errorData = await res.json();
        const errorMessage = errorData.error || "Failed to update avatar. Please try again.";
        setSuccessMessage(`Failed to update avatar. Error: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = "An error occurred while updating avatar. Please try again.";
      setSuccessMessage(errorMessage);
      console.log("Error", error);
    }
  };

  const isValidUrl = (url) => {
    const urlRegex = /^https?:\/\/.*$/;
    return urlRegex.test(url);
  };
  return (
    <>
      <Form className={styles.formUrl} onSubmit={handelAvatarSubmit}>
        <Form.Label className={styles.formLabel} htmlFor="basic-url">
          Add a vanity URL to update user avatar
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">URL</InputGroup.Text>
          <Form.Control
            aria-describedby="basic-addon3"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
              setLinkError("");
              setSuccessMessage("");
            }}
          />
          <Button variant="success" type="submit">
            Update
          </Button>{" "}
        </InputGroup>
        {linkError && <div className={error.errorMessage}>{linkError}</div>}
        {successMessage && <div className={success.success}>{successMessage}</div>}
      </Form>
    </>
  );
};
export default UpdateAvatar;
