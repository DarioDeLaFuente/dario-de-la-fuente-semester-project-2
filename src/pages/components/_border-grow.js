import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GrowLoading() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Spinner as="span" animation="grow" size="xl" role="status" aria-hidden="true" />
          </Col>
        </Row>
        <Row>
          <Col>
            <span>Make a entery</span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GrowLoading;
