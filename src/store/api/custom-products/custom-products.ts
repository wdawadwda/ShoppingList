import { BACKEND_URL, type ProductInList, type ErrorObject, ProductCustom } from "@/constants";
import { UpdateingProductInList } from "@/constants/products-lists/products-lists.type";
import { RootState } from "@/store/store.types";
import { createErrorObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError, type AxiosResponse } from "axios";

export const patchCustomProduct = async (
  productId: string | number,
  userId: string | number,
  updatedFields: UpdateingProductInList,
): Promise<ProductCustom | ErrorObject> => {
  try {
    const response = await axios.patch<UpdateingProductInList, AxiosResponse<ProductCustom>>(
      `${BACKEND_URL}api/v1/custom-product/${productId}/?user=${userId}`,
      updatedFields,
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const deleteCustomProduct = async (
  productId: string | number,
  userId: string | number,
): Promise<void | ErrorObject> => {
  try {
    await axios.delete<void>(`${BACKEND_URL}api/v1/custom-product/${productId}/?user=${userId}`);
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const createCustomProduct = createAsyncThunk<
  ProductCustom,
  Omit<ProductCustom, "id">,
  {
    rejectValue: ErrorObject;
  }
>("custom-products/createCustomProduct", async (product, thunkAPI) => {
  try {
    const response = await axios.post<Omit<ProductCustom, "id">, AxiosResponse<ProductCustom>>(
      `${BACKEND_URL}api/v1/custom-product/`,
      product,
    );
    const state = thunkAPI.getState() as RootState;
    if (state.user.currentUser.status === "success" && state.user.currentUser.data) {
      thunkAPI.dispatch(fetchCustompProducts(state.user.currentUser.data.id));
    }
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    return thunkAPI.rejectWithValue(errorObject);
  }
});

export const fetchCustompProducts = createAsyncThunk<
  ProductInList[],
  string | number,
  {
    rejectValue: ErrorObject;
  }
>("custom-products/fetchCustompProducts", async (userId, thunkAPI) => {
  try {
    const response = await axios.get<ProductInList[], AxiosResponse<ProductInList[]>>(
      `${BACKEND_URL}api/v1/custom-product/`,
      { params: { user: userId } },
    );

    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    return thunkAPI.rejectWithValue(errorObject);
  }
});
