import { BACKEND_URL, type ErrorDetail } from "@/constants";
import { ProductsListsDataApi } from "@/store/lists-products";
import { createErrorObject } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError, type AxiosResponse } from "axios";

export const fetchProductsLists = createAsyncThunk<
  ProductsListsDataApi,
  string | number,
  {
    rejectValue: ErrorDetail;
  }
>("lists-products/fetchProductsLists", async function (userId, thunkAPI) {
  try {
    const response = await axios.get<ProductsListsDataApi, AxiosResponse<ProductsListsDataApi>>(
      `${BACKEND_URL}/api/v1/products-list-data/?user_id=${userId}`,
      {
        signal: thunkAPI.signal,
      },
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorDetail>);
    // thunkAPI.dispatch(listsProductsActions.setError(errorObject));
    return thunkAPI.rejectWithValue(errorObject);
  }
});
