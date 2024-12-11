import React, { useState } from "react";

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
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Поисковая строка */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Введите запрос..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`px-4 py-2 rounded-md border ${
              selectedFilters.includes(filter.id)
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Отображение выбранных фильтров */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Выбранные фильтры:</h3>
        <p>{selectedFilters.length > 0 ? selectedFilters.join(", ") : "Нет"}</p>
      </div>
    </div>
  );
};

export default FiltersAndSearch;
