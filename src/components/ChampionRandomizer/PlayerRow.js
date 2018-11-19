import React, { Component } from 'react';

class PlayerRow extends Component {
  render() {
    let { playerNumber, picks, ban } = this.props.player;
    return (
      <div className="ChampionResults-row">
        <b>PLAYER {playerNumber}:</b> Pick {picks} // Ban {ban}
      </div>
    );
  }
}

export default PlayerRow;
