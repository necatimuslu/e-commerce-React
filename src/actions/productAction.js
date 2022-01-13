import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCT,
  UPDATE_PRODUCT,
} from "../constants/productConstants";
import * as api from "../services/productService";

export const fetchAllProduct = () => async (dispatch) => {
  const { data } = await api.getAllProduct();

  dispatch({
    type: GET_ALL_PRODUCT,
    payload: data,
  });
};

export const createProduct =
  (authtoken, formData, toast, history) => async (dispatch) => {
    const { data } = await api.createProduct(authtoken, formData);

    dispatch({
      type: CREATE_PRODUCT,
      payload: data,
    });
    toast.success("Ürün başarıyla eklendi");
    history.push("/admin/products");
  };

export const updateProduct =
  (authtoken, productForm, id, history, toast) => async (dispatch) => {
    const { data } = await api.updateProduct(authtoken, productForm, id);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
    toast.dark("Ürün başarıyla güncellendi");
    history.push("/admin/products");
  };

export const deleteProduct = (authtoken, id, toast) => async (dispatch) => {
  await api.deleteProduct(authtoken, id);

  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
  toast.error("Ürün başarıyla silindi");
};
