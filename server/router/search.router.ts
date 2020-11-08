import { SearchService } from "../service/search.service";
import express from 'express';
import { Router } from "./router.interface";
import { Package } from "../../common/package.model";

const SEARCH_PATH = '/packages';

/**
 * The router for acessing package resources
 */
export class SearchRouter implements Router {

  private app: express.Application;
  private service: SearchService = null;

  constructor(currentApp: express.Application) {
    this.app = currentApp;
    this.service = new SearchService();
  }

  initializeRoutes(): void {
    // Define the search packages route
    this.app.get(SEARCH_PATH, (req: express.Request, res: express.Response) => {
      // Get the package name and version as input
      const input: string = req.query.input.toString();
      // Get the latest package versions
      this.service.getLatestPackageVersions(input).then((packages: Array<Package>) => {
        res.json(packages);
      }).catch((err: any) => {
        res.json(err);
      });
    });
  }

}