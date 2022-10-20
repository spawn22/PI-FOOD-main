import axios from "axios";

export const GET_ALL_RECIPE = "GET_ALL_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const ORDER_RECIPE = "ORDER_RECIPE";
export const ORDER_HEALTH_SCORE = "ORDER_HEALTH_SCORE";
export const GET_LIST_DIETS = "GET_LIST_DIETS";
export const FILTER_DIETS = "FILTER_DIETS";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const PAGE_DETAIL = "PAGE_DETAIL";
export const CREATED_EXISTING = "CREATE_EXISTING";

export function getAllRecipes() {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/recipes/`)
      .then((response) => {
        console.log(response);
        return dispatch({ type: GET_ALL_RECIPE, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getRecipeName(value) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/?name=${value}`
      );
      dispatch({ type: GET_RECIPE_NAME, payload: response.data });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };
}

export function getPageDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      dispatch({ type: GET_RECIPE_DETAIL, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderRecipes(data) {
  return {
    type: ORDER_RECIPE,
    payload: data,
  };
}

export function orderHealthScore(data) {
  return {
    type: ORDER_HEALTH_SCORE,
    payload: data,
  };
}

export function getListDiets() {
  return (dispatch) => {
    fetch(`http://localhost:3001/diets`)
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        return dispatch({ type: GET_LIST_DIETS, payload: response });
      })
      .catch((error) => console.log("Error:", error));
  };
}

export function filterDiets(data) {
  return {
    type: FILTER_DIETS,
    payload: data,
  };
}

export function createRecipePost(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:3001/recipes`, data);
      dispatch({ type: CREATE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteRecipe(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/recipes/${id}`
      );
      dispatch({ type: DELETE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function pageDetail(data = {}) {
  return {
    type: PAGE_DETAIL,
    payload: data,
  };
}
export const createExist = (data) => {
  return {
    type: CREATED_EXISTING,
    payload: data,
  };
};
