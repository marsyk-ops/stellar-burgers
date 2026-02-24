import { RootState } from '../store';

// Ingredients selectors
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

// Constructor selectors
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

// User selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;

// Orders selectors
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectOrdersLoading = (state: RootState) => state.orders.isLoading;
export const selectOrdersError = (state: RootState) => state.orders.error;

// Feeds selectors
export const selectFeedsOrders = (state: RootState) => state.feeds.orders;
export const selectFeedsTotal = (state: RootState) => state.feeds.total;
export const selectFeedsTotalToday = (state: RootState) =>
  state.feeds.totalToday;
export const selectFeedsCurrentOrder = (state: RootState) =>
  state.feeds.currentOrder;
export const selectFeedsLoading = (state: RootState) => state.feeds.isLoading;
export const selectFeedsError = (state: RootState) => state.feeds.error;
