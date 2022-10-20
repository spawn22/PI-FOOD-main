import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipePost } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { dishDB, cuisines } from "./List";
import "./CreateRecipe.css";
import camara from "../img/camara.png";
import bloq from "../img/bloq.png";
export default function CreateRecipe() {
  const listDiets = useSelector((state) => state.listDiets);
  const lis = listDiets.map((e) => e.name);
  const listDishTypes = dishDB.map((e) => e);
  const listCuisines = cuisines.map((e) => e);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    healthScore: "1",
    summary: "",
    readyInMinutes: "",
    cuisines: [],
    dishTypes: [],
    image: "",
    diets: [],
    steps: "",
  });
  const [validName, setValidName] = useState(true);
  const [validSummary, setValidSummary] = useState(true);
  const [validSteps, setValidSteps] = useState(true);
  const [validMinutes, setValidMinutes] = useState(true);
  const myRegex = {
    name: /^\s/g,
  };
  const handleBloq = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      image: "",
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      image:
        "https://www.clara.es/medio/2021/12/16/que-comer-hoy-ideas_21beeb02_1200x630.jpg",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("Please enter a name");
    } else {
      dispatch(
        createRecipePost({
          ...form,
          steps: [{ number: "", step: form.steps }],
        })
      );
    }
    alert("Recipe created");
    history.push("/home");
    window.location.reload();
  };
  const handleDishDelete = (el) => {
    setForm({
      ...form,
      dishTypes: form.dishTypes.filter((di) => di !== el),
    });
  };
  const handleCuisinesDelete = (e) => {
    setForm({
      ...form,
      cuisines: form.cuisines.filter((c) => c !== e),
    });
  };
  const handleDietDelete = (el) => {
    setForm({
      ...form,
      diets: form.diets.filter((di) => di !== el),
    });
  };
  const handleSelect = (e) => {
    if (e.target.name === "dishTypes") {
      setForm({
        ...form,
        dishTypes: [...new Set([...form.dishTypes, e.target.value])],
      });
    } else if (e.target.name === "diets") {
      setForm({
        ...form,
        diets: [...new Set([...form.diets, e.target.value])],
      });
    } else if (e.target.name === "cuisines") {
      setForm({
        ...form,
        cuisines: [...new Set([...form.cuisines, e.target.value])],
      });
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validate() {
    if (myRegex.name.test(form.name) || form.name === "") setValidName(false);
    else setValidName(true);
    if (form.summary.length < 5) setValidSummary(false);
    else setValidSummary(true);
    if (form.steps.length < 5) setValidSteps(false);
    else setValidSteps(true);
    if (!form.readyInMinutes > 0) setValidMinutes(false);
    else setValidMinutes(true);
  }
  return (
    <div className="create-recipe-container">
      {/* BACK BTN */}

      {/* TITTLE H1 */}

      <section>
        <button className="btn-back-form" onClick={() => history.goBack()}>
          Back
        </button>
        <div className="create-recipe-main">
          <h1 className="h1-tittle">Create Recipe</h1>

          <form
            autoComplete="off"
            className="create-recipe-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* TITTLE */}
            <div>
              <label className="label-main">Title: </label>
              <input
                className="input-form-recipe"
                name="name"
                value={form.title}
                type="text"
                placeholder="Title of recipe"
                onChange={(e) => handleChange(e)}
                onKeyUp={() => validate(form)}
                onBlur={() => validate(form)}
              />
              <span className="error-message">
                {!validName && "DON'T LEAVE EMPTY SPACES"}
              </span>
              {/* READY IN MINUTES*/}
              <div>
                <label className="label-main">Ready in Minutes: </label>
                <input
                  className="input-ready-recipe"
                  name="readyInMinutes"
                  type="number"
                  min="0"
                  max="720"
                  value={form.readyInMinutes}
                  placeholder="Ready in...?"
                  onChange={(e) => handleChange(e)}
                  onKeyUp={() => validate(form)}
                  onBlur={() => validate(form)}
                />

                <span className="error-message">
                  {!validMinutes && "720 minutes or less"}
                </span>
              </div>
            </div>
            {/* HEALTH SCORE */}
            <div>
              <label className="label-main">
                Health Score: {form.healthScore}
              </label>
              <input
                className="input-health-recipe"
                name="healthScore"
                value={form.healthScore}
                type="range"
                min={1}
                max={100}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* SUMMARY */}
            <div>
              <label className="label-main">Summary: </label>
              <input
                className="input-form-recipe"
                name="summary"
                value={form.summary}
                type="text"
                placeholder="Summary of recipe - 5 character or longer"
                onChange={(e) => handleChange(e)}
                onKeyUp={() => validate(form)}
                onBlur={() => validate(form)}
              />
              <span className="error-message-summary">
                {!validSummary && "REQUIRED"}
              </span>
            </div>
            {/* IMAGE */}
            <div>
              <label className="label-main">Image: </label>
              <input
                className="input-form-recipe"
                name="image"
                value={form.image}
                type="text"
                placeholder="URL of image"
                onChange={(e) => handleChange(e)}
              />
              <img className="img-form" src={form.image} alt={form.image} />
              <button className="add-url" onClick={handleAdd}>
                <img className="camera" src={camara} alt="camera" />
              </button>
              <button className="bloq-url" onClick={handleBloq}>
                <img className="bloq" src={bloq} alt="bloq" />
              </button>
            </div>
            {/* CUISINES */}

            <div className="select-cuisines-container">
              <label className="label-main">Cuisines: </label>
              <select name="cuisines" onChange={handleSelect}>
                {listCuisines.map((c) => (
                  <option key={c} value={c} onChange={handleChange}>
                    {c}
                  </option>
                ))}
              </select>
              <div class="select-option">
                {form.cuisines.map((d) => (
                  <div key={d} className="div-delete">
                    <p>{d}</p>
                    <button
                      className="btn-delete"
                      onClick={() => handleCuisinesDelete(d)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DISH*/}

            <div className="select-dish-container">
              <label className="label-main">Dish Types: </label>
              <select name="dishTypes" onChange={handleSelect}>
                {listDishTypes.map((dish) => (
                  <option key={dish} value={dish} onChange={handleChange}>
                    {dish[0].toUpperCase() + dish.substring(1)}
                  </option>
                ))}
              </select>
              <div name="dishDelete" className="select-option">
                {form.dishTypes.map((d) => (
                  <div key={d} className="div-delete">
                    <p>{d[0].toUpperCase() + d.substring(1)}</p>
                    <button
                      className="btn-delete"
                      onClick={() => handleDishDelete(d)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="div-diets-container">
              {/* DIETS CONTAINER*/}

              <label className="label-main">Diets: </label>
              <select name="diets" onChange={handleSelect}>
                {lis.map((diet) => (
                  <option key={diet} value={diet} onChange={handleChange}>
                    {diet[0].toUpperCase() + diet.substring(1)}
                  </option>
                ))}
              </select>
              <div className="select-option">
                {form.diets.map((d) => (
                  <div key={d} className="div-delete">
                    <p>{d[0].toUpperCase() + d.substring(1)}</p>
                    <button
                      className="btn-delete"
                      onClick={() => handleDietDelete(d)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* STEPS */}
            <div>
              <label className="label-main-steps">Steps: </label>
              <textarea
                className="input-steps-recipe"
                name="steps"
                value={form.steps}
                type="text"
                placeholder="Steps of recipe - 5 character or longer"
                onChange={(e) => handleChange(e)}
                onKeyUp={() => validate(form)}
                onBlur={() => validate(form)}
              />
            </div>

            <span className="error-message-setps">
              {!validSteps && "REQUIRED"}
            </span>

            {/* VALIDATIONS */}
            {!form.name ||
            !validSteps ||
            !validName ||
            !validSummary ||
            !validMinutes ? (
              <button className="btnDisabled" disabled>
                Submit
              </button>
            ) : (
              <button className="button-submit">Submit</button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
