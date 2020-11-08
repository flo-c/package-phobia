import { Package } from "../../common/package.model";
import { NPM_CMD, Command } from "./command";

export class SuggestionService {

  /**
   * Get the suggestions based on input
   * Execute the command npm search --json XXXX
   * where XXXX is the package name proposal
   * @param input 
   */
  async getSuggestions(input: string): Promise<Array<Package>> {
    const cmd: Command = new Command(NPM_CMD, ['search', '--json', input]);
    const data = await cmd.execute();
    const res: Array<Package> = [];
    data.forEach((datum: any) => {
      res.push(new Package(
        datum.name,
        datum.description,
        datum.version
      ));
    });
    return res;
  }

}