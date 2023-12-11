import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await axios.get('/api/recipes/');
        const categoriesResponse = await axios.get('/api/categories/');

        console.log('Recipes response:', recipesResponse.data);
        console.log('Categories response:', categoriesResponse.data);

        setRecipes(recipesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    console.log('Category Value Type:', typeof categoryValue);
    setSelectedCategory(String(categoryValue));
    console.log('Selected Category:', selectedCategory);
  };

  const handleSearchClick = () => {
    if (selectedCategory) {
      // Если выбрана категория, выполним поиск по категории
      history.push(`/category/${selectedCategory}`);
    } else {
      // Если выбрано "All Categories", сбросим результаты поиска
      setSearchResults([]);
    }
  };

  const searchRecipesByCategory = async (categoryValue) => {
    try {
      console.log('Category Value (Request):', categoryValue);

      const response = await axios.get('/api/recipes-by-category/', {
        params: { category_id: Number(categoryValue) },
      });
      console.log(`Recipes by Category Response:`, response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching recipes by category:', error);
      setSearchResults([]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
        <h2>Recipes</h2>
            <form className="search-form">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                ))}
                </select>
                <button className="btn" onClick={handleSearchClick}>
                Search
                </button>
            </form>
        <div className="gallery">
            {searchResults.length > 0 ? (
            searchResults.map((recipe) => (
                <div key={recipe.id} className="card">
                <a href={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div>{recipe.title || 'Untitled Recipe'}</div>
                </a>
                </div>
            ))
            ) : (
            recipes.map((recipe) => (
                <div key={recipe.id} className="card">
                <a href={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div>{recipe.title || 'Untitled Recipe'}</div>
                </a>
                </div>
            ))
            )}
        </div>
        </div>
  );
};

export default Home;




