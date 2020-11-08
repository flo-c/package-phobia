import { SuggestionService } from "../service/suggestion.service";
import express from 'express';
import { Router } from "./router.interface";
import { Package } from "../../common/package.model";

const SUGGEST_PATH = '/suggestions';

/**
 * The router for accessing suggestions
 */
export class SuggestionRouter implements Router {

  private app: express.Application;
  private service: SuggestionService = null;

  constructor(currentApp: express.Application) {
    this.app = currentApp;
    this.service = new SuggestionService();
  }

  initializeRoutes(): void {
    // Define the route to retrieve suggestions for a given input
    this.app.get(SUGGEST_PATH, (req: express.Request, res: express.Response) => {
      this.service.getSuggestions(req.query.input.toString()).then((packages: Array<Package>) => {
        res.json(packages);
      }).catch((err: any) => {
        res.json(err);
      });
    });
  }
  
}