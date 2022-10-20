import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeName,
  orderRecipes,
  orderHealthScore,
  getListDiets,
  filterDiets,
  createExist,
} from "../../redux/actions/";
import "./SearchBar.css";
import { Link } from "react-router-dom";
import btnHome from "../img/dibujococina3.png";

export default function SearchBar({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const listDiets = useSelector((state) => state.listDiets);
  const lis = listDiets.map((e) => e.name);

  useEffect(() => {
    if (listDiets.length === 0) {
      dispatch(getListDiets());
    }
  }, [dispatch, listDiets]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeName(input));
    setInput("");
    setCurrentPage(1);
  };

  const handleOrderFilter = (e) => {
    if (e.target.value === "A-Z" || e.target.value === "Z-A") {
      dispatch(orderRecipes(e.target.value));
      setOrder(e.target.value);
      setCurrentPage(1);
    } else {
      dispatch(orderHealthScore(e.target.value));
      setOrder(e.target.value);
      setCurrentPage(1);
    }
  };
  const handleListCreated = (e) => {
    dispatch(createExist(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  };
  const handleFilterDiets = (e) => {
    dispatch(filterDiets(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="search-bar">
      <Link to="/">
        <button className="btn-home"  >
          <img className="home" src={btnHome} alt="home" />
        </button>
      </Link>
      <Link to="/create">
        <button className="create-recipe" type="button">
          Create Recipe
        </button>
      </Link>
      <select onChange={(e) => handleOrderFilter(e)} className="menu-order">
        <option value="order">Order</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="H-L">High Health</option>
        <option value="L-H">Low Health</option>
      </select>
      <select onChange={(e) => handleListCreated(e)} className="created-exist">
        <option value="all">Created-existing</option>
        <option value="created">Created</option>
        <option value="existing">Existing</option>
      </select>

      <select
        onChange={(e) => handleFilterDiets(e)}
        className="menu-filter-recipe"
      >
        <option value="allDiets">All Diets</option>
        {lis.map((element) => (
          <option key={element} value={element}>
            {element[0].toUpperCase() + element.substring(1)}
          </option>
        ))}
      </select>
      <button onClick={() => window.location.reload()} className="refresh">
        Reset
      </button>

      <form className="search-form-container" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="input"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Search recipe"
          value={input}
        />
        <input
          className={!input ? "btnsearch-hidden" : "btnsearch"}
          type="submit"
          value="Search"
          disabled={!input || /^[\pL\s]*$/.test(input) ? true : false}
        />
      </form>
    </div>
  );
}
