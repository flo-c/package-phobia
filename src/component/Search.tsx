import React from 'react';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Package } from '../../common/package.model';
import { splitNameVersion } from '../service/package.util';

interface ISearchProps {
  suggest: (input: string) => void;
  searchedPackage: Package | null;
  search: (input: string) => void;
}

interface ISearchState {
  packageInput: string;
}

/**
 * The Search component is in charge of getting the inputs of the user
 * And display the suggestion of packages to be searched
 */
class Search extends React.Component<ISearchProps, ISearchState> {

  input: Subject<string>;
  subscription!: Subscription;

  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      packageInput: (props.searchedPackage !== null) ?
        (props.searchedPackage.name + '@' + props.searchedPackage) : ''
    };
    this.input = new Subject();
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount(){
    this.subscription = this.input.pipe(debounceTime(300)).subscribe((x: string) => {
      this.props.suggest(x);
    });
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  componentDidUpdate(prevProps: ISearchProps) {
    if ((prevProps.searchedPackage === null && this.props.searchedPackage !== null)
      || (prevProps.searchedPackage !== null && this.props.searchedPackage === null)
      || (prevProps.searchedPackage !== null && this.props.searchedPackage !== null
        && prevProps.searchedPackage.name !== this.props.searchedPackage.name
        && prevProps.searchedPackage.version !== this.props.searchedPackage.version)) {
      this.setState({
        packageInput: (this.props.searchedPackage !== null) ?
          (this.props.searchedPackage.name + '@' + this.props.searchedPackage.version) : ''
      });
    }
  }

  handleChange(event: any) {
    this.setState({
      packageInput: event.target.value
    });
    this.input.next(splitNameVersion(event.target.value).name);
  }

  handleSearchSubmit(event: any) {
    event.preventDefault();
    this.props.search(this.state.packageInput);
  }

  render() {
    const { handleChange, handleSearchSubmit } = this;
    const { searchedPackage } = this.props;
    if (searchedPackage != null) {
      return (<form className="form-row" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Find package"
          value={searchedPackage.name + '@' + searchedPackage.version}
        />
      </form>);
    } else {
      return (<form className="form-row" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Find package"
        />
      </form>);
    }
  }

}

export default Search;