import Spinner from "react-bootstrap/Spinner";
//import Button from "react-bootstrap/Button";

function GrowLoading() {
  //return <Spinner animation="grow" />;
  return (
    <>
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
      Make a entery
    </>
  );
}

export default GrowLoading;
