import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';

export default function SearchProducts({
  setResults,
  products,
  handleCategoryChange,
}) {
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handlehandgeProducts = (e) => {
    setSelectedCategory(e.target.value);
    handleCategoryChange(e.target.value);
  };

  const fetchData = (value) => {
    // console.log('value', value);
    const results = products.filter((product) => {
      return (
        product &&
        product.nameproduct &&
        product.nameproduct.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div class="w-screen justify-center mt-20 flex mb-4">
      <form className="w-96">
        <Input
          label="Cerca i prodotti"
          onChange={(e) => handleChange(e.target.value)}
          value={input}
          type="search"
          id="default-search"
          color="teal"
          class="block p-4 pl-10 w-full text-sm text-gray-900"
          required
        />
        <select
          value={selectedCategory}
          onChange={handlehandgeProducts}
          defaultValue="All"
          className=" mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="All">Tutti</option>
          <option value="Pizza">Pizza</option>
          <option value="Dolce">Dolce</option>
          <option value="Sushi">Sushi</option>
        </select>
      </form>
    </div>
  );
}
