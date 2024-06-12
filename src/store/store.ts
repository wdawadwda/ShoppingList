import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReduser";
import { userlistenerMiddleware } from "./user";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(userlistenerMiddleware.middleware),
});
