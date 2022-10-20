import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

export default function Recipe(recipe) {
  const { name, image, diets, id, healthScore } = recipe;
  const dietsList = diets.map(
    (e) => e[0].toUpperCase() + e.substring(1) + ". "
  );

  return (
    <div className="recipe-container">
      <div className="container-recipe-image">
        <Link to={`/recipes/${id}`}>
          <img className="recipe-img" src={image} alt={name} />
        </Link>
      </div>
      <div className="container-recipe-card-title">
        <span className="recipe-card-title">{name}</span>
      </div>
      <p className="dietsList">{dietsList}</p>
      <div className="container-health-score">
        <p className="health-score">
          Health Score:{" "}
          <span
            className={
              healthScore > 65
                ? "hGreen"
                : healthScore < 40
                ? "hRed"
                : "hOrange"
            }
          >
            {healthScore}
          </span>
        </p>
      </div>
    </div>
  );
}
