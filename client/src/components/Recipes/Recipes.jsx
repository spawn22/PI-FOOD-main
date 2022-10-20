import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import { Paginate } from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import "./Recipes.css";
export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const allRecipesPage = currentPage * postsPerPage;
  const indexOfFirstPost = allRecipesPage - postsPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, allRecipesPage);
  const totalPages = Math.ceil(recipes.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [, setOrder] = useState("");

  useEffect(() => {
    if (!recipes.length) {
      dispatch(getAllRecipes());
    }
  }, [dispatch, recipes]);

  return recipes.length > 0 && recipes !== undefined ? (
    <>
      <div className="recipes-container">
        <SearchBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <div className="up-paginate-container">
          <Paginate
            currentPage={currentPage}
            paginate={paginate}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="recipes-list">
          {currentPosts.map((e) => (
            <div className="card-list-recipe">
              <RecipeCard
                key={e.id}
                name={e.name}
                image={e.image}
                diets={e.diets}
                id={e.id}
                healthScore={e.healthScore}
              />
            </div>
          ))}
        </div>

        <Paginate
          currentPage={currentPage}
          paginate={paginate}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

    </>
  ) : (
    <div className="container-loading">
      <div className="lds-ring">
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
        <div className="lds-ring-child"></div>
      </div>
      <span className="span-loading">
        <h1>Loading...</h1>
      </span>
    </div>
  );
}
