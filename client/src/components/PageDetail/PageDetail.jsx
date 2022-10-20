import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageDetail, deleteRecipe, pageDetail } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import "./PageDetail.css";
export default function PageDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    dispatch(getPageDetail(id));
    return () => {
      dispatch(pageDetail());
    };
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
    alert("Recipe deleted");
    history.push("/home");
    window.location.reload();
  };

  const infoRecipes = useSelector((state) => state.infoRecipes);
  return (
    <div className="container-pagedetail-main">
      <button className="btn-back-card" onClick={() => history.goBack()}>
        Back
      </button>
      <h1 className="title-pagedetail">{infoRecipes.name}</h1>
      <div className="container-image">
        <img
          className="image-page-detail"
          src={infoRecipes.image}
          alt={infoRecipes.name}
        />

        <p className="cuisines">
          {infoRecipes.cuisines?.map((cu) => (
            <p className="card-Cuisines" key={cu}>
              
              <span className="name-cuisines">
                <strong>{cu}</strong>
              </span>
            </p>
          ))}{" "}
        </p>
        <div className="container-tables">
          <p className="healthScore">
            HealthScore:
            <p className="p-HealthScore">
              <strong>{infoRecipes.healthScore}</strong>
            </p>
          </p>
          <p className="p-ready">
            Ready in:
            <p className="readyInMinutes">
              <strong>{infoRecipes.readyInMinutes} minutes</strong>
            </p>
          </p>
          <p className="dish-list">
            Dish Types:
            {infoRecipes.dishTypes?.map((dishType) => (
              <div className="div-card-Dish">
                <p className="card-Dish" key={dishType}>
                  <strong>
                    {dishType[0].toUpperCase() + dishType.substring(1)}
                  </strong>
                </p>
              </div>
            ))}
          </p>

          <p className="diets-list">
            Diets:
            {infoRecipes.diets?.map((diet) => (
              <div className="div-diets">
                <p className="card-diets" key={diet}>
                  <strong>{diet[0].toUpperCase() + diet.substring(1)}</strong>
                </p>
              </div>
            ))}
          </p>
        </div>
      </div>

      <div className="div-summary">
        <h2 className="h1-Summary">Summary</h2>
        <p className="summary" />

        {infoRecipes.summary && infoRecipes.summary.replace(/<[^>]+>/g, "")}

        <p>
          <strong>Steps by steps:</strong>
          {infoRecipes.steps?.map((e) => (
            <div className="div-steps">
              <p key={e.number} className="steps">
                <strong>Step {e.number}</strong> - {e.step}
              </p>
            </div>
          ))}
        </p>
      </div>
      {id.length > 15 ? (
        <button className="recipe-delete" onClick={() => handleDelete()}>
          DELETE
        </button>
      ) : null}
    </div>
  );
}
