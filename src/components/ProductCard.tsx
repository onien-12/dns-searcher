import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  score: number;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  score,
  url,
}) => {
  return (
    <a href={url} target="_blank">
      <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center">
        <img
          src={image}
          alt={title}
          className="h-48 object-contain mb-4 rounded"
        />
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <p className="text-gray-400 text-sm">Рейтинг: {score}</p>
      </div>
    </a>
  );
};

export default ProductCard;
