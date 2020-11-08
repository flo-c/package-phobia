import { createAction } from "@reduxjs/toolkit";
import { Package } from "../../common/package.model";

// Action for getting suggestions
export const suggestPackages = createAction<string>('SUGGEST_PACKAGES');
export const packagesSuggested = createAction<Array<Package>>('PACKAGES_SUGGESTED');

// Action for searching for a package
export const searchPackage = createAction<Package>('SEARCH_PACKAGE');
export const packageSearched = createAction<Array<Package>>('PACKAGE_SEARCHED');

// Action for direct searching for a package
export const directSearchPackage = createAction<string>('DIRECT_SEARCH_PACKAGE');