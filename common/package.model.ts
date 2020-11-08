/**
 * Represents a npm package
 */
export class Package {

  name: string;
  description: string;
  version: string;
  // Size of minified
  msize: number;
  // Size of minified and gzipped
  gsize: number;

  constructor(pacName: string, pacDescription: string, pacVersion: string) {
    this.name = pacName;
    this.description = pacDescription;
    this.version = pacVersion;
    this.msize = 0;
    this.gsize = 0;
  }

}