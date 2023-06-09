import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFromStorage } from "../../utils/storage";
import { FaUserCircle } from "react-icons/fa";
import OffcanvasNav from "../components/_nav";
import Card from "react-bootstrap/Card";
import GrowLoading from "../components/_border-grow";
import CreateEntry from "../components/_create-entry";
import EntryList from "../components/_entry-list";
import FluidExample from "../components/_image";
import UpdateAvatar from "../components/_updateAvatar";
import Footer from "../components/_footer";
import styles from "../../styles/profileCard.module.css";

function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [entryList, setEntryList] = useState([]);
  const [avatarData, setAvatarData] = useState(null);
  const [avatarKey, setAvatarKey] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, [router.query.user]);

  const fetchProfile = async () => {
    const name = router.query.user;
    const storedUser = getFromStorage("user");
    if (!name) return;

    if (!storedUser) {
      router.push(`/`);
    }
    setUser(storedUser);
    const options = {
      headers: {
        Authorization: `Bearer ${storedUser.accessToken}`,
      },
    };
    const res = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${name}`, options);
    const data = await res.json();
    setProfile(data);
    console.log("Set proile", data);
    setAvatarData(data.avatar);
  };
  useEffect(() => {
    setAvatarKey((prevKey) => prevKey + 1);
  }, [profile]);
  const handleEntryCreated = (newEntry) => {
    setEntryList([...entryList, newEntry]);
    console.log("entryList", entryList);
    console.log("newentry", newEntry);
    fetchProfile();
  };
  const handleAvatarUpdated = (newAvatarData) => {
    setAvatarData(newAvatarData);
    console.log("data", newAvatarData);
  };
  if (!profile || !user) {
    return <GrowLoading></GrowLoading>;
  }

  return (
    <>
      <OffcanvasNav userCredits={profile.credits} />
      <div className="container">
        <div className="py-5 text-center">
          <h2>The Market of Opportunities.</h2>
          <p className="lead">
            Below is an example form built entirely with Bootstrap's form controls. Each required
            form group has a validation state that can be triggered by attempting to submit the form
            without completing it.
          </p>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-1">
            <div className={styles.card}>
              <div className={styles.profileImage}>
                {avatarData ? (
                  <img className={styles.profileImage} src={avatarData} alt="Avatar" />
                ) : (
                  <FaUserCircle />
                )}
              </div>
              <div className={styles.textContainer}>
                <UpdateAvatar
                  key={avatarKey}
                  avatar={avatarData}
                  onAvatarUpdated={handleAvatarUpdated}
                />
              </div>
              <div className={styles.textContainer}>
                <p className={styles.name}>Hei {profile.name}</p>
                <div className={styles.profile}>
                  <p>Email: {profile.email}</p>
                  <p>Credits: {profile.credits}</p>
                  <Card.Subtitle>Auction:{profile._count.listings}</Card.Subtitle>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 order-md-3">
            <h4 className="mt-3">Create a Listing</h4>
            <CreateEntry onEntryCreated={handleEntryCreated} />
          </div>
          <div className="col-md-6 order-md-4 ">
            <h4 className="d-flex justify-content-between align-items-center ">Your entry list:</h4>
            <EntryList user={user} entryList={entryList} />
          </div>
          <div className="col-md-6 order-md-5 ">
            <div className={styles.card}>
              <h4 className="d-flex justify-content-between align-items-center ">
                Your entry list:
              </h4>
              <p>Email: {profile.email}</p>
              <p>Credits: {profile.credits}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
