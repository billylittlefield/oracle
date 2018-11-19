import React, { Component } from 'react';
import ChampionResults from './ChampionResults';

class ChampionRandomizer extends Component {
  
  render() {
    let results;
    if (this.props.results !== null) {
      results = <ChampionResults results={this.props.results} />
    } else {
      results = null;
    }
    return (
      <>
        <div>
          <button className="ChampionRandomizer-button" onClick={() => this.props.onClick()}>
            Randomize
          </button>
        </div>
        {results}
      </>
    )
    
  }
}

export default ChampionRandomizer;
