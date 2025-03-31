import React from "react";

interface Props {
  id: number;
  name?: string;
  image?: string;
  url?: string;
  price?: string;
}

const ProductCard = ({
  id,
  name = "N/A",
  image = "No image",
  url = "N/A",
  price = "0",
}: Props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{price}</h5>
        <p className="card-text">
          {name} {id}
        </p>
        <a href={url} className="btn btn-primary">
          View Product
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
