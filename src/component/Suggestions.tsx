import React from 'react';
import './Suggestions.css';
import { Package } from '../../common/package.model';

interface ISuggestionsProps {
  suggestions: Array<Package>;
  select: (pac: Package) => void;
}

/**
 * The Search component is in charge of getting the inputs of the user
 * And display the suggestion of packages to be searched
 */
class Suggestions extends React.Component<ISuggestionsProps> {

  constructor(props: ISuggestionsProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pac: Package) {
    const self = this;
    return (event: any) => {
      self.props.select(pac);
    }
  }

  render() {
    const { handleClick } = this;
    const { suggestions } = this.props;
    if (suggestions.length > 0) {
      return (<div className="list-group suggestion-view">
        {suggestions.map((suggestion, index) => (<a
          className="list-group-item list-group-item-action suggestion"
          onClick={handleClick(suggestion)}
          key={'suggestion_' + index}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{suggestion.name}</h5>
              <small className="text-muted">{suggestion.version}</small>
            </div>
            <p className="mb-1">{suggestion.description}</p>
          </a>))}
      </div>);
    }
    return (<div
      data-testid="hidden-suggestions"
      className="suggestion-view-hidden"
    ></div>);
  }

}

export default Suggestions;