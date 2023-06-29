import React from "react";

export default function DisplayMessage({ messageType, message }) {
  return <div className={messageType}>{message}</div>;
}
