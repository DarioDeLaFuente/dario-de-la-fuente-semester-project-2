//import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

function CardPlaceholder() {
  return (
    <Card style={{ width: "22rem" }}>
      <Card.Img
        variant="top"
        src="https://placehold.jp/25/ffff/005eec/250x250.png?text=Placeholder%20IMG%0A%20The%20Market%20of%20Opportunities."
      />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={6} />
      </Card.Body>
    </Card>
  );
}

export default CardPlaceholder;
