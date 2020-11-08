import semver from 'semver';
import { Package } from "../../common/package.model";
import { NPM_CMD, Command } from './command';
import fs from 'fs';
import path from 'path';

const VERSION_REGEXP: RegExp = /^[0-9]{1,5}\.[0-9]{1,5}\.[0-9]{1,5}$/g;

/**
 * Service to handle search of versions and their sizes for a package
 * A cache mechanism should be added in the future
 */
export class SearchService {

  /**
   * Get the latest package versions with their size
   * @param input the package name and its version
   */
  async getLatestPackageVersions(input: string): Promise<Array<Package>> {
    // Get the list of versions
    const getInfoCmd = new Command(NPM_CMD, ['view', '--json', input]);
    const data = await getInfoCmd.execute();
    const pacName: string = data.name;
    const versions: Array<string> = this.getLatestVersionList(data.versions);
    // Create promise for each version to get sizes of unpacked and gzip
    const promises: Array<Promise<Package>> = versions.map((version: string) => {
      const getTarballUrlCmd = new Command(NPM_CMD, ['view', '--json', pacName + '@' + version, 'dist']);
      return getTarballUrlCmd.execute()
        .then((distData: any) => {
          const installCmd = new Command(NPM_CMD, ['pack', '--json', distData.tarball]);
          return installCmd.execute();
        })
        .then((installData: Array<any>) => {
          const gsize = installData[0].size;
          const msize = installData[0].unpackedSize;
          fs.unlinkSync(path.resolve('./' + installData[0].filename));
          const pckg: Package = new Package(pacName, null, version);
          pckg.msize = msize;
          pckg.gsize = gsize;
          return pckg;
        });
    });
    return Promise.all(promises);
  }

  /**
   * Get the latest version list filtered to get 
   * the 3 latest published versions and the latest previous major version
   * (if different from the 3 latest published)
   * @param versions 
   */
  getLatestVersionList(versions: Array<string>): Array<string> {
    // remove prerelease and build meta tag from versions and sort the list
    const filteredVersions = versions.filter((version: string) => {
      return version.match(VERSION_REGEXP);
    }).sort(semver.compare);
    if (filteredVersions.length > 0) {
      const res: Array<string> = [];
      let i: number = 0;
      let elm: string = null;
      const latestVersion = filteredVersions[filteredVersions.length - 1];
      const currentMajorVersion: number = semver.major(latestVersion);
      let sameMajorVersion: boolean = true;
      // Get the 3 latest published versions
      while (i < 3 && filteredVersions.length > 0) {
        elm = filteredVersions.pop();
        res.splice(0, 0, elm);
        sameMajorVersion = sameMajorVersion && (semver.major(elm) == currentMajorVersion);
        i++;
      }
      // Get the previous major version in case it is not in the 3 latest published versions
      if (sameMajorVersion) {
        let found: boolean = false;
        while(!found && filteredVersions.length > 0) {
          elm = filteredVersions.pop();
          if (semver.major(elm) < currentMajorVersion) {
            found = true;
            res.splice(0, 0, elm);
          }
        }
      }
      return res;
    }
    return [];
  }

  /**
   * Get the latest minified package versions with their size
   * @param input the package name and its version
   */
  async getLatestMinifiedPackageVersions(input: string): Promise<Array<Package>> {
    // Get the list of versions
    const getInfoCmd = new Command(NPM_CMD, ['view', '--json', input]);
    const data = await getInfoCmd.execute();
    const pacName: string = data.name;
    const versions: Array<string> = this.getLatestVersionList(data.versions);
    this.createFolder('./tmp');
    // Create promise for each version to get sizes of minified and gzip
    const promises: Array<Promise<Package>> = versions.map((version: string) => {
      // TODO: implement the following algorithm
      // 1. Install in the temporary folder the package version
      // 2. Build a minified bundle of the installed package thanks to webpack
      //    The webpack configuration should declare all the mandatory plugin to
      //    properly handled most of the supported files (js, jsx, css, scss, etc)
      //    The configuration could be the same as the one used by package-build-stats
      //    https://github.com/pastelsky/package-build-stats/blob/master/src/config/makeWebpackConfig.ts
      // 3. Measure the size of the minified bundle
      // 4. Gzip the minified bundle thanks to node-gzip for instance
      // 5. Measure the size of the gzipped minified bundle
      return null;
    });
    return Promise.all(promises);
  }

  /**
   * Create a folder if it does not exist
   * @param mPath 
   */
  createFolder(mPath: string): void {
    const tmpPath = path.resolve(mPath);
    if (!fs.existsSync(tmpPath)) {
      fs.mkdirSync(tmpPath);
    }
  }

}