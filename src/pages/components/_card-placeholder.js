import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import styles from "../../styles/CardBody.module.css";

function CardPlaceholder() {
  return (
    <Card className={styles.card}>
      <Card.Link className={styles.link}>
        <Card.Img className={styles.cardImg} variant="top" />
        <Card.Body className={styles.cardbody}>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={8} />
            <Placeholder xs={6} />
            <Placeholder xs={4} />
            <Placeholder xs={2} />
          </Placeholder>
        </Card.Body>
      </Card.Link>
    </Card>
  );
}

export default CardPlaceholder;
