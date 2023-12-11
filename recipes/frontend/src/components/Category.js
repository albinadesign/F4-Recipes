import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = ({ match }) => {
  const [category, setCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/categories/${match.params.id}/`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecipesByCategory = async () => {
      try {
        const response = await axios.get('/api/recipes-by-category/', {
          params: { category_id: match.params.id },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes by category:', error);
        setRecipes([]);
      }
    };

    fetchData();
    fetchRecipesByCategory();
  }, [match.params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
  {category ? (
    <div>
      <h2 className="category-title">{category.name}</h2>
      <div className="gallery">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.title} />
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              {recipe.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="not-found">Category not found</p>
  )}
  <Link to="/" className="home-link">Home</Link>
</div>
  );
};

export default Category;





