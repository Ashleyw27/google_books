import React from "react";

function Card({link, image, title, author, synopsis}) {
  return (
    <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-2">
        <img src={image} className="card-img" alt="book cover" />
      </div>

      <div className="col-md-10">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text"><small className="text-muted">by: {author}</small></p>
          <p className="card-text">{synopsis}</p>
          <a className="btn"href={link} target="_blank">Click here to view book details</a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Card;