import express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { CONFIG_PORT } from './config';
import { Router } from './router/router.interface';
import { SearchRouter } from './router/search.router';
import { SuggestionRouter } from './router/suggestion.router';

export class Application {

  private app: express.Application;
  private routers: Array<Router>;

  constructor() {
    this.app = express();
    this.routers = [];

    // Add the routers
    const suggestionRouter = new SuggestionRouter(this.app);
    const searchRouter = new SearchRouter(this.app);
    this.routers.push(suggestionRouter);
    this.routers.push(searchRouter);
  }

  public initialize(): void {
    this.app.use(express.static(__dirname + '/../'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname + '/../index.html'));
    });

    this.initializeRoutes();
  }

  /**
   * Initialize the routes to be targeted by client side
   */
  private initializeRoutes(): void {
    this.routers.forEach(router => {
      router.initializeRoutes();
    });
  }

  public listen(): void {
    this.app.listen(CONFIG_PORT);
    console.log('Package Phobia started on port ' + CONFIG_PORT);
  }

}