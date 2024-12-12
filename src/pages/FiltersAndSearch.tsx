import React, { FormEvent, useState } from "react";
import { getProductGroups } from "../api";
import { ProductGroup } from "../api/types";
import ProductCard from "../components/ProductCard";

type FilterOption = {
  id: string;
  name: string;
};

const filters: FilterOption[] = [
  { id: "toy", name: "Игрушки" },
  { id: "tv", name: "Телевизоры" },
  { id: "game", name: "Игры" },
];

const FiltersAndSearch: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [productGroups, setProductGroups] = useState<ProductGroup[] | null>(
    null
  );
  const [error, setError] = useState("");

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const query = formData.get("query") as string;
    if (!query) return setError("Введите запрос!");

    setError("");

    const products = await getProductGroups(query);
    if (!products?.product_groups?.length)
      return setError("Произошла ошибка(((99");

    setProductGroups(products.product_groups);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Поисковая строка */}
      <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Подбор подарков..."
          className="w-full px-4 py-2 border border-neutral-300 rounded-md outline-none focus:border-focus transition-all"
        />
        <b className="font-bold text-red-500">{error}</b>
        <button>Поиск</button>
      </form>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`text-white transition-all ${
              selectedFilters.includes(filter.id) ? "bg-selected" : "bg-primary"
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Отображение карточек товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard
          image="https://via.placeholder.com/150"
          title="Смартфон Samsung Galaxy"
          price="41 999 ₽"
          description="6.6' Смартфон Samsung Galaxy A55 256 ГБ"
          isAvailable={true}/>
          <ProductCard
            image="https://via.placeholder.com/150"
            title="Игровая приставка Sony"
            price="59 999 ₽"
            description="PlayStation 5 с дисководом"
            isAvailable={false}
          />
          <ProductCard
            image="https://via.placeholder.com/150"
            title="Телевизор LG OLED"
            price="89 999 ₽"
            description="OLED 55' 4K UHD Smart TV"
            isAvailable={true}
          />
          <ProductCard
            image="https://via.placeholder.com/150"
            title="Умные часы Apple Watch"
            price="29 999 ₽"
            description="Apple Watch Series 9"
            isAvailable={true}
          />
          <ProductCard
            image="https://via.placeholder.com/150"
            title="Пылесос Dyson"
            price="39 999 ₽"
            description="Беспроводной пылесос Dyson V15"
            isAvailable={false}
          />
        </div>
      </div>
    );
  };
  
  export default FiltersAndSearch;