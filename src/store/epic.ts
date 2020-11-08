import { Action } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { from, Observable } from "rxjs";
import { map, filter, mergeMap, takeUntil, take } from 'rxjs/operators'
import { Package } from "../../common/package.model";
import { PackageService } from '../service/package.service';
import { splitNameVersion } from '../service/package.util';

import {
  packageSearched,
  packagesSuggested,
  searchPackage,
  suggestPackages,
  directSearchPackage
} from './actionCreators';

const service = new PackageService();

// Epic for getting the suggestions
const suggestEpic$ = (actions$: Observable<Action>) =>
actions$.pipe(
  filter(suggestPackages.match),
  map((action: any) => action.payload),
  mergeMap((payload: string) => {
    return from(service.fetchSuggestions(payload)).pipe(
      map((packages: Array<Package>) => {
        return packages;
      }),
      takeUntil(actions$.pipe(
        filter(directSearchPackage.match),
        take(1)
      ))
    );
  }),
  map((packages: Array<Package>) => {
    return packagesSuggested(packages);
  })
);

// Epic for searching for a package
const searchEpic$ = (action$: Observable<Action>) =>
action$.pipe(
  filter(searchPackage.match),
  map((action: any) => action.payload),
  mergeMap((payload: Package) => {
    return service.fetchPackages(payload);
  }),
  map((packages: Array<Package>) => {
    return packageSearched(packages);
  })
);

// Epic for direct searching for a package
const directSearchEpic$ = (actions$: Observable<Action>) =>
actions$.pipe(
  filter(directSearchPackage.match),
  map((action: any) => action.payload),
  mergeMap((payload: string) => {
    const nameVersion = splitNameVersion(payload);
    if (nameVersion.version !== undefined && nameVersion.version !== '') {
      return service.fetchPackages({
        name: nameVersion.name,
        version: nameVersion.version
      });
    }
    return service.fetchSuggestions(nameVersion.name)
      .then((packages: Array<Package>) => {
        if (packages !== null && packages.length > 0) {
          return service.fetchPackages(packages[0]);
        }
        return new Promise<Array<Package>>((resolve) => {
          resolve([]);
        });
      });
  }),
  map((packages: Array<Package>) => {
    return packageSearched(packages !== null ? packages : []);
  })
);

const epic = combineEpics(suggestEpic$, searchEpic$, directSearchEpic$);
export default epic;