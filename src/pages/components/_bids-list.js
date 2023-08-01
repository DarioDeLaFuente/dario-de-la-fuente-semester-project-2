import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import bidBox from "../../styles/bidConteiner.module.css";

function listOfBids({ bids }) {
  console.log("post.bids", bids);
  console.log("post.array", Array.isArray(bids));
  return (
    <ListGroup as="ol">
      {Array.isArray(bids) &&
        bids.map((bid) => (
          <ListGroup.Item key={bid.id} as="li" className={bidBox.conteinerBox}>
            <div className="ms-2 me-auto">
              <div className="fw-bold"> Bid amount:{bid.amount} </div>
              User:{bid.bidderName}
            </div>
            <Badge className="m-3 " bg="primary" pill>
              {bid.created}
            </Badge>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default listOfBids;
