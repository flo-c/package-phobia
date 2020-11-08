import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import './App.css';

import Header from './component/Header';
import Search from './component/Search';
import Suggestions from './component/Suggestions';
import SizeResult from './component/SizeResult';
import HistoryResult from './component/HistoryResult';
import { Package } from '../common/package.model';

import {
  suggestPackages,
  searchPackage,
  directSearchPackage
} from './store/actionCreators';
import { MainState } from './store/reducer';

interface IAppProps {
  suggestions: Array<Package>;
  suggestPackages: (x: string) => void;
  searchPackage: (pac: Package) => void;
  directSearchPackage: (x: string) => void;
  searchedPackage: Package | null;
  loading: boolean;
  displayNoResultMessage: boolean;
  searchedResults: Array<Package>;
}

const App = ({
  suggestions: propSuggestions,
  suggestPackages: propSuggestPackages,
  searchPackage: propSearchPackage,
  directSearchPackage: propDirectSearchPackage,
  searchedPackage: propSearchedPackage,
  loading: propLoading,
  displayNoResultMessage: propDisplayNoResultMessage,
  searchedResults: propSearchedResults
}: IAppProps) => {
  return (
    <div className="App">
      <Header />
      <main className="app-row">
        <div className="col-2">&nbsp;</div>
        <div className="col-8">
          <div className="app-row">
            <div className="col-3">&nbsp;</div>
            <div className="col-6">
              <div className="search-box">
                <Search
                  suggest={propSuggestPackages}
                  searchedPackage={propSearchedPackage}
                  search={propDirectSearchPackage}
                />
                <Suggestions
                  suggestions={propSuggestions}
                  select={propSearchPackage}
                />
              </div>
            </div>
            <div className="col-3">&nbsp;</div>
          </div>
          <div className="app-row">
            {!propLoading
              && propSearchedResults.length > 0
              && propSuggestions.length === 0
              && propSearchedPackage !== null
              && [<div className="col-6">
              <SizeResult
                package={propSearchedPackage}
              />
            </div>,
            <div className="col-6">
              <HistoryResult
                packages={propSearchedResults}
              />
            </div>]}
            {propLoading && <div className="col-12 content-center">
              <div className="spinner-grow bg-spinner text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>}
            {propDisplayNoResultMessage && <div className="col-12 content-center">
              <h3 className="content-center">No package has been found!</h3>
            </div>}
          </div>
        </div>
        <div className="col-2">&nbsp;</div>
      </main>
    </div>
  );
}

export default connect(
  (state: MainState) => ({
    suggestions: state.suggestions,
    searchedPackage: state.searchedPackage,
    loading: state.loading,
    searchedResults: state.searchedResults,
    displayNoResultMessage: state.displayNoResultMessage
  }),
  (dispatch: Dispatch) => bindActionCreators({
    suggestPackages,
    searchPackage,
    directSearchPackage
  }, dispatch)
)(App);
