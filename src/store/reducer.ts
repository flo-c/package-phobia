import { createReducer } from "@reduxjs/toolkit";

import { Package } from '../../common/package.model';
import {
  searchPackage,
  packagesSuggested,
  suggestPackages,
  packageSearched,
  directSearchPackage
} from "./actionCreators";

export interface MainState {
  suggestions: Array<Package>;
  searchedPackage: Package | null;
  searchedResults: Array<Package>;
  loading: boolean;
  displayNoResultMessage: boolean;
}

const initialState: MainState = {
  suggestions: [],
  searchedPackage: null,
  searchedResults: [],
  loading: false,
  displayNoResultMessage: false
};

export const mainReducer = createReducer(initialState, {
  [suggestPackages.type]: (state, action) => {
    const res = Object.assign({}, state);
    res.displayNoResultMessage = false;
    res.searchedPackage = null;
    res.loading = true;
    return res;
  },
  [packagesSuggested.type]: (state, action) => {
    const res = Object.assign({}, state);
    res.suggestions = action.payload;
    res.loading = false;
    res.displayNoResultMessage = false;
    return res;
  },
  [searchPackage.type]: (state, action) => {
    // In case of search for a package size
    // Remove the suggestions and store the searched package with its version
    const res = Object.assign({}, state);
    res.suggestions = [];
    res.searchedPackage = action.payload;
    res.loading = true;
    return res;
  },
  [packageSearched.type]: (state, action) => {
    const res = Object.assign({}, state);
    res.searchedResults = action.payload;
    if (res.searchedResults.length > 0) {
      res.displayNoResultMessage = false;
      res.searchedPackage = res.searchedResults[res.searchedResults.length - 1];
    } else {
      res.displayNoResultMessage = true;
    }
    res.loading = false;
    return res;
  },
  [directSearchPackage.type]: (state, action) => {
    const res = Object.assign({}, state);
    res.searchedPackage = null;
    res.suggestions = [];
    res.loading = true;
    res.displayNoResultMessage = false;
    return res;
  }
});