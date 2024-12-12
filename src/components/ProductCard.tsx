import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  isAvailable: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  description,
  isAvailable,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      {/*<p className="font-bold text-orange-500 text-lg">{price}</p>*/}
      <p className="text-gray-400 text-sm">
        {isAvailable ? "В наличии" : "Нет в наличии"}
      </p>
    </div>
  );
};

export default ProductCard;
