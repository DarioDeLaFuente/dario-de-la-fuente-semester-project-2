import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OffcanvasNav from "./components/_nav";
import { FcRightDown2 } from "react-icons/fc";
import { FcLeftDown2 } from "react-icons/fc";

const infoPage = () => {
  return (
    <>
      <OffcanvasNav></OffcanvasNav>
      <Container>
        <div className="py-5 text-center">
          <h2>Welcome to Unsigned Market</h2>
          <p className="lead">
            <b>Your Ultimate Guide: </b>Are you ready to embark on an exhilarating journey into the
            world of online auctions? Look no further than Unsigned Market – your ultimate
            destination for thrilling bidding wars and uncovering hidden treasures. In this
            comprehensive guide, we'll walk you through everything you need to know to make the most
            out of your experience on our dynamic platform.
          </p>
        </div>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <div class="card-info-container mb-5">
              <h2>1. Getting Started</h2>
              <p>
                Whether you're an avid collector, a passionate seller, or simply someone with an
                appreciation for unique finds, Unsigned Market has something special for everyone.
                To kickstart your adventure, follow these steps:
              </p>
              <p>
                <b>Registration: </b>If you have a stud.noroff.no email, you're eligible to become a
                member of our vibrant community. Signing up is a breeze – just head to our website
                and complete the registration process.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <FcRightDown2 class="info-icon ip-icon-logo"></FcRightDown2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FcLeftDown2 class="info-icon ip-icon-logo"></FcLeftDown2>
          </Col>
          <Col md={{ span: 6, offset: 0 }}>
            <div class="card-info-container mb-5">
              <h2>2. Navigating the Platform</h2>
              <p>
                Now that you're a part of the Unsigned Market family, let's take a tour of our
                user-friendly platform:
              </p>
              <p>
                <b>Logging In and Out: </b>Use your registered credentials to log in and explore the
                exciting world of online auctions. When you're ready to wrap up your session, you
                can easily log out for added security.
              </p>
              <p>
                <b>Updating Your Avatar: </b>Personalize your profile by adding a unique avatar.
                Express yourself and stand out in our bustling community.
              </p>
              <p>
                <b>Checking Your Credits: </b>Keep an eye on your credit balance, which is your
                currency for bidding and trading. As a new member, you'll receive 1000 credits to
                kick off your auction journey.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <div class="card-info-container mb-5">
              <h2>3. Becoming a Seller</h2>
              <p>
                Have a special item you'd like to share with fellow enthusiasts? Creating a listing
                on Unsigned Market is a breeze:
              </p>
              <p>
                <b>Crafting Your Listing: </b> Showcase your treasure by crafting a listing with a
                captivating title, a deadline date for the auction, a stunning media gallery, and a
                compelling description. This is your chance to make a lasting impression on
                potential bidders.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <FcRightDown2 class="info-icon ip-icon-logo"></FcRightDown2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FcLeftDown2 class="info-icon ip-icon-logo"></FcLeftDown2>
          </Col>
          <Col md={{ span: 6, offset: 0 }}>
            <div class="card-info-container mb-5">
              <h2>4. Bidding and Interacting</h2>
              <p>
                Engaging with other users is at the heart of Unsigned Market. Dive into the
                excitement with these features:
              </p>
              <p>
                <b>Placing Bids: </b>Got your eye on an irresistible item? Use your credits to place
                bids and join the bidding war. The credit-based system ensures a fair and thrilling
                competition.
              </p>
              <p>
                <b>Viewing Bids: </b>Keep track of the action by viewing the bids made on your
                listing. Witness the competition unfold in real-time.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <div class="card-info-container mb-5">
              <h2>5. Exploring as an Unregistered User</h2>
              <p>
                Even if you're not registered, you can still explore the listings and get a taste of
                the Unsigned Market experience:
              </p>
              <p>
                <b>Browsing Listings: </b>Search through a wide array of listings to discover
                intriguing items and get a sense of what our platform has to offer. Ready to dive
                in? Unsigned Market is your gateway to a captivating world of online auctions.
                Whether you're a buyer, a seller, or a curious browser, our platform offers an
                unforgettable trading experience. So, what are you waiting for? Let the bidding
                begin and uncover your next prized possession on Unsigned Market!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default infoPage;
