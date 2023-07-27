import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/storage";
import style from "../../styles/formCard.module.css";
import error from "../../styles/errorMessage.module.css";

function GenerateEntry({ onEntryCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState([]);
  const [ends, setEnds] = useState(new Date().toISOString());
  const [entryList, setEntryList] = useState([]);
  const [formError, setFormError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [tagsError, setTagsError] = useState(null);
  const [mediaError, setMediaError] = useState(null);
  const [endsError, setEndsError] = useState(null);

  useEffect(() => {
    console.log("Entry List:", entryList);
  }, [entryList]);

  const handleEntrySubmit = async (event) => {
    event.preventDefault();

    const token = getToken();

    if (!isFormValid()) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const data = {
      title: title,
      description: description,
      media: media,
      tags: tags ? tags : [],
      endsAt: ends,
    };

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/auction/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      console.log("response", response);

      if (response.ok) {
        const json = await response.json();
        console.log("JASON createt entry", json);
        onEntryCreated(json);
      } else {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message || "Failed to create entry";
        setFormError(errorMessage);
        console.log("Error creating entry:", errorMessage);
      }
    } catch (error) {
      console.error("Error creating entry:", error);
      setFormError("An error occurred while creating the entry.");
    }
    setTitle("");
    setDescription("");
    setTags("");
    setMedia([]);
    setEnds(new Date().toISOString());
  };

  const handleMediaChange = (e) => {
    const mediaValue = e.target.value;
    const mediaArray = mediaValue.split(",").map((url) => url.trim());
    setMedia(mediaArray);
  };

  const isFormValid = () => {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Title is required.");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required.");
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    if (!tags.length) {
      setTagsError("Tags is required.");
      isValid = false;
    } else {
      setTagsError(null);
    }

    if (media.length === 0) {
      setMediaError("Media is required.");
      isValid = false;
    } else {
      setMediaError(null);
      const mediaRegex = /^https?:\/\/.*$/;
      for (const url of media) {
        if (!mediaRegex.test(url)) {
          setMediaError("Media must be a valid URL starting with 'http://' or 'https://'.");
          isValid = false;
          break;
        }
      }
    }

    if (ends.trim() === "") {
      setEndsError("Ends At is required.");
      isValid = false;
    } else {
      setEndsError(null);
    }

    return isValid;
  };
  return (
    <>
      <Form className={style.card} onSubmit={handleEntrySubmit} controlid="entry-form">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <p className={error.errorMessage}>{titleError}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && <p className={error.errorMessage}>{descriptionError}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            value={tags}
            onChange={(e) => setTags(e.target.value.split(","))}
          />
          {tagsError && <p className={error.errorMessage}>{tagsError}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Media</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            value={media.join(",")}
            onChange={handleMediaChange}
          />
          {mediaError && <p className={error.errorMessage}>{mediaError}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ends At</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ends"
            value={ends}
            onChange={(e) => setEnds(e.target.value)}
          />
          {endsError && <p className={error.errorMessage}>{endsError}</p>}
        </Form.Group>
        <Button as="input" type="submit" value="Submit" />
        {formError && <p className={error.errorMessage}>{formError}</p>}
      </Form>
    </>
  );
}

export default GenerateEntry;
