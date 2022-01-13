import { configureStore } from "@reduxjs/toolkit";

import contentReducer from "./content";

const store = configureStore({
  reducer: { content: contentReducer },
});

export default store;
