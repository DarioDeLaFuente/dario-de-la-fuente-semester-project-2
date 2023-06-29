import React from "react";
import Card from "react-bootstrap/Card";
//import styles from "../../styles/Footer.module.css";
//className={styles.footer}

function Footer() {
  return (
    <Card className="text-center mt-4">
      <Card.Footer className="text-muted">The Market of Opportunities.</Card.Footer>
    </Card>
  );
}

export default Footer;
