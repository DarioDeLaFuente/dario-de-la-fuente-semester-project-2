import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function listOfBids({ bids }) {
  console.log("post.bids", bids);
  console.log("post.array", Array.isArray(bids));
  return (
    <ListGroup as="ol">
      {Array.isArray(bids) &&
        bids.map((bid) => (
          <ListGroup.Item
            key={bid.id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold"> Bid amount:{bid.amount} </div>
              User:{bid.bidderName}
            </div>
            <Badge className="mt-3" bg="primary" pill>
              {bid.created}
            </Badge>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default listOfBids;
