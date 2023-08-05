import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../../styles/footer.module.css";

function Footer() {
  return (
    <Card className="text-center mt-4">
      <Card.Footer className={`${styles.footer}`}>The Market of Opportunities.</Card.Footer>
    </Card>
  );
}

export default Footer;
