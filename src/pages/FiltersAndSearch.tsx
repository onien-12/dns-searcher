import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { getProductGroups, getSuggestions } from "../api";
import { PriceRange, ProductGroup } from "../api/types";
import ProductCard from "../components/ProductCard";
import { debounceTime, fromEvent } from "rxjs";
import { Loader } from "../components/Loader";

const defaultSuggestions = [
  "Подарок сыну",
  "Подарок мужу",
  "Подарок жене",
  "Подарок дочери",
];

const FiltersAndSearch: React.FC = () => {
  const [productGroups, setProductGroups] = useState<ProductGroup[] | null>(
    null
  );
  const [error, setError] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const queryInputRef = useRef<HTMLInputElement | null>(null);

  const products = useMemo(
    () =>
      productGroups
        ? productGroups.slice(0, 6).map((g) => g.products[0])
        : null,
    [productGroups]
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPriceRange((prev) => ({
      ...(prev as PriceRange),
      [name as keyof PriceRange]: value ? +value : undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let price: null | PriceRange = { ...priceRange } as PriceRange;
    if (price && price.min && !price.max) price.max = 9999999;
    if (price && price.max && !price.min) price.min = 1;
    if (!price.max && !price.min) price = null;

    const formData = new FormData(event.target as HTMLFormElement);
    const query = formData.get("query") as string;
    if (!query) return setError("Введите запрос!");

    setProductGroups(null);
    setSuggestions(defaultSuggestions);
    setLoading(true);
    setError("");

    const products = await getProductGroups(query, price ?? undefined);

    setLoading(false);
    if (!products?.product_groups?.length)
      return setError("Произошла ошибка(((99");

    setProductGroups(products.product_groups);
  };

  const handleQuerySuggestions = async () => {
    if (!queryInputRef.current) return;

    const query = queryInputRef.current.value;
    const suggestions = await getSuggestions(query);
    if (!suggestions?.length) return;

    setSuggestions(suggestions);
  };

  useEffect(() => {
    if (!queryInputRef.current) return;

    const changeObservable = fromEvent(queryInputRef.current, "input")
      .pipe(debounceTime(500))
      .subscribe(handleQuerySuggestions);

    return () => changeObservable.unsubscribe();
  }, [queryInputRef]);

  return (
    <main className="w-3/4 p-4 mx-auto">
      {/* Поисковая строка */}
      <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Подбор подарков..."
          className="w-full px-4 py-2 border border-neutral-300 rounded-md outline-none focus:border-focus transition-all"
          ref={queryInputRef}
          value={query}
          onInput={(e) => setQuery(e.currentTarget.value)}
        />
        <b className="font-bold text-red-500">{error}</b>

        {/* Поля ввода цен */}
        <div className="flex gap-2">
          <input
            type="number"
            name="min"
            value={priceRange?.min ?? ""}
            onChange={handlePriceChange}
            placeholder="Цена от"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md outline-none focus:border-focus transition-all"
          />
          <input
            type="number"
            name="max"
            value={priceRange?.max ?? ""}
            onChange={handlePriceChange}
            placeholder="Цена до"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md outline-none focus:border-focus transition-all"
          />
        </div>

        <button>{loading ? "..." : "Поиск"}</button>
      </form>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-6">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(suggestion.trim());
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Отображение карточек товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products &&
          products?.map((p) => (
            <ProductCard
              key={p.guid}
              description={p.specs}
              image={p.image}
              score={p.rating}
              title={p.title}
              url={`https://www.dns-shop.ru/product/${p.searchUid}`}
            />
          ))}
      </div>

      <div className="flex flex-row justify-center">
        {loading && <Loader />}
      </div>
    </main>
  );
};

export default FiltersAndSearch;
