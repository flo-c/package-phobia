import { Package } from "../../common/package.model";

const URL_BASE = window.location.href;

/**
 * The search service provides function to fetch data
 * for the search and suggest functionalities
 */
export class PackageService {

  /**
   * Fetch the suggestions based on the input
   * @param input 
   */
  async fetchSuggestions(input: string): Promise<Array<Package>> {
    const url = new URL(URL_BASE + 'suggestions');
    url.searchParams.append('input', input);
    return fetch(url.toString()).then(res => res.json())
  }

  /**
   * Fetch the packages based on the package name and version
   * @param input
   */
  async fetchPackages(input: {
    name: string;
    version: string;
  }): Promise<Array<Package>> {
    const url = new URL(URL_BASE + 'packages');
    url.searchParams.append('input', input.name + '@' + input.version);
    return fetch(url.toString()).then(res => res.json());
  }

}