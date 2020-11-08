/**
 * Display a package version with its sizes with the proper unit
 */
export class DisplayVersion {
  version: string;
  msize: number;
  gsize: number;
  unit: string;

  constructor(dVersion: string, dMsize: number, dGsize: number) {
    this.version = dVersion;
    this.msize = dMsize;
    this.gsize = dGsize;
    let i = 0;
    while((i < UNITS.length - 1)
      && (this.msize > BYTE_NUMBER || this.gsize > BYTE_NUMBER)) {
        this.msize = this.msize / BYTE_NUMBER;
        this.gsize = this.gsize / BYTE_NUMBER;
        i++;
    }
    this.unit = UNITS[(i < UNITS.length) ? i : (UNITS.length - 1)];
  }

}

/** Number of Bytes in a given storage unit prefix */
export const BYTE_NUMBER: number = 1024;
/** Storage unit list */
export const UNITS: Array<string> = ['B', 'kB', 'MB', 'GB'];