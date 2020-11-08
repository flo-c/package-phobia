import React from 'react';
import './SizeResult.css';
import { Package } from '../../common/package.model';
import { DisplayVersion } from '../model/version.model';

interface ISizeResultProps {
  package: Package | null;
}

/**
 * SizeResult component displays the size of a module minified and gzip
 */
export default class SizeResult extends React.Component<ISizeResultProps> {

  render() {
    if (this.props.package != null) {
      const version = new DisplayVersion(this.props.package.version,
        this.props.package.msize, this.props.package.gsize);
      return (<div className="card border border-primary">
        <div className="card-header bg-primary">
          <h2 className="app-headline">Size</h2>
        </div>
        <table className="table card-body">
          <tbody>
            <tr>
              <td className="content-center">
                <p><strong>{version.msize.toFixed(2) + version.unit}</strong></p>
                <p><em>Unpacked</em></p>
              </td>
            </tr>
            <tr>
              <td className="content-center">
                <p><strong>{version.gsize.toFixed(2) + version.unit}</strong></p>
                <p><em>Gzipped</em></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>);
    }
    return (<div
      data-testid="empty-result"
    >&nbsp;</div>);
  }

}