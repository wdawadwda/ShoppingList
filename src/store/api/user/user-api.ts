import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError, type AxiosResponse } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL, KEYS, type ErrorDetail, type JWTTokens, type User, type UserRequest } from "@/constants";
import { createErrorObject } from "@/utils";
import { UserTheme } from "@/store/theme";

export const saveThemeToServer = async (userId: number, theme: UserTheme) => {
  try {
    const response = await axios.patch(`${BACKEND_URL}/api/v1/user-settings/${userId}/`, { user_theme: theme });
    return response.data;
  } catch (error) {
    console.error("Error updating theme:", error);
    throw error;
  }
};

export async function registerUser(signUpData: UserRequest) {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/users/`, signUpData);
    return response.data;
  } catch (error: unknown) {
    const errors = error;
    throw errors;
  }
}

export const createTokens = createAsyncThunk<
  JWTTokens,
  UserRequest,
  {
    rejectValue: ErrorDetail;
  }
>("user/createTokens", async function (payload: UserRequest, thunkAPI) {
  try {
    const response = await axios.post<JWTTokens, AxiosResponse<JWTTokens>, UserRequest>(
      `${BACKEND_URL}/api/v1/token/`,
      payload,
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

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async function ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }, thunkAPI) {
    try {
      const { data } = await axios.get<User>(`${BACKEND_URL}/auth/users/me/`, {
        signal: thunkAPI.signal,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response?.status === 401) {
          // Если статус 401, обновить токен
          try {
            // запрос на сервер для обновления токена
            const refreshResponse = await axios.post(`${BACKEND_URL}/api/v1/token/refresh/`, {
              refresh: refreshToken,
            });

            // новый токен из ответа сервера
            const newAccessToken = refreshResponse.data.access;
            await AsyncStorage.setItem(KEYS.USER.ACCESS_TOKEN, newAccessToken);
            // запрос с новым токеном
            const { data } = await axios.get<User>(`${BACKEND_URL}/auth/users/me/`, {
              signal: thunkAPI.signal,
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return data;
          } catch (refreshError) {
            if (axios.isAxiosError(refreshError)) {
              // Если обновление токена не удалось
              thunkAPI.dispatch({ type: "user/logout" });
              return thunkAPI.rejectWithValue(refreshError.response?.data);
            } else {
              // если ошибки не относятся к AxiosError
              throw refreshError;
            }
          }
        } else {
          return thunkAPI.rejectWithValue(response?.data);
        }
      } else {
        //  типы ошибок, если это не AxiosError
        throw error;
      }
    }
  },
);
