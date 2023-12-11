import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Recipe = ({ match }) => {
  const [recipe, setRecipe] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${match.params.id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [match.params.id]); 

  const handleHomeClick = () => {
    history.push('/');
  };

  return (
    <div>
  {recipe ? (
    <div className="recipe-card">
      <h2 className="card-title">{recipe.title}</h2>
      <p className="recipe-description">{recipe.description}</p>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      )}
      {recipe.category && (
        <p className="recipe-category">
          <button onClick={() => history.push(`/category/${recipe.category.id}`)}>
            {recipe.category.name}
          </button>
        </p>
      )}
      {/* Другие поля рецепта */}
    </div>
  ) : (
    <p>Loading...</p>
  )}
  <button className="home-button" onClick={handleHomeClick}>Home</button>
  <div className="space-under-button"></div>
</div>
  );
};

export default Recipe;


