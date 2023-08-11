import Spinner from "react-bootstrap/Spinner";
//import Button from "react-bootstrap/Button";

function GrowLoading() {
  //return <Spinner animation="grow" />;
  return (
    <>
      <Spinner as="span" animation="grow" size="xl" role="status" aria-hidden="true" />
      <p>Make a entery</p>
    </>
  );
}

export default GrowLoading;
