import {
  BACKEND_URL,
  type ErrorObject,
  type ProductsListData,
  type ProductsListDataRequest,
  type ErrorDetail,
} from "@/constants";
import { ProductsListsDataApi } from "@/store/lists-products";
import { createErrorObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError, type AxiosResponse } from "axios";

export const updateProductsList = async (
  listId: string | number,
  userId: string | number,
  updatedData: ProductsListDataRequest,
): Promise<ProductsListDataRequest | ErrorObject> => {
  try {
    const response = await axios.put<ProductsListDataRequest, AxiosResponse<ProductsListDataRequest>>(
      `${BACKEND_URL}api/v1/products-list-data/${listId}/?user=${userId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const deleteProductListData = async (
  objId: string | number,
  userId: string | number,
): Promise<void | ErrorObject> => {
  try {
    const response = await axios.delete<void>(`${BACKEND_URL}api/v1/products-list-data/${objId}/?user=${userId}`, {});
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const createProductsLists = async (
  newList: ProductsListDataRequest,
): Promise<ProductsListData | ErrorObject> => {
  try {
    const response = await axios.post<ProductsListDataRequest, AxiosResponse<ProductsListData>>(
      `${BACKEND_URL}api/v1/products-list-data/`,
      newList,
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const fetchProductsLists = createAsyncThunk<
  ProductsListsDataApi,
  string | number,
  {
    rejectValue: ErrorDetail;
  }
>("lists-products/fetchProductsLists", async function (userId, thunkAPI) {
  try {
    const response = await axios.get<ProductsListsDataApi, AxiosResponse<ProductsListsDataApi>>(
      `${BACKEND_URL}/api/v1/products-list-data/?user=${userId}`,
      {
        signal: thunkAPI.signal,
      },
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorDetail>);
    return thunkAPI.rejectWithValue(errorObject);
  }
});
