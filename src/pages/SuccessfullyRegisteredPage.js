import Head from "next/head";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SuccessfullyRegisteredPage = () => {
  return (
    <>
      <Head>
        <title>Unsigned Market</title>
        <meta name="description" content="Generated by Unsigned Market" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <h1>Registration Successful!</h1>
          </Col>
          <Row className="justify-content-md-center">
            <Col xs lg="6">
              <p>Thank you for registering. Your account has been successfully created.</p>
              <p>You can now log in and start using our services.</p>
              <Button href="/LoginPage" variant="outline-success" className="reg-button">
                Log in
              </Button>
              {""}
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default SuccessfullyRegisteredPage;
