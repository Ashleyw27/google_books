import React from "react";

function Card({title, author, synopsis}) {
  return (
    <div className="card mb-3">
    <div className="row no-gutters">
      <div class="col-md-2">
        <img src="..." className="card-img" alt="Book Image" />
      </div>

      <div class="col-md-10">
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text"><small class="text-muted">by: {author}</small></p>
          <p class="card-text">{synopsis}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Card;