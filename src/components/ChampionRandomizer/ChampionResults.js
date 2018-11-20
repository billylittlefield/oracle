import React, { Component } from 'react';
import PlayerRow from './PlayerRow';

class ChampionResults extends Component {
  renderPlayers(players) {
    return players.map((player, index) => {
      return <PlayerRow key={index.toString()} player={player} />;
    });
  }

  copyToClipboard() {
    let textArea = document.createElement('textarea');
    let rowElements = Array.from(document.querySelectorAll('.ChampionResults-row'));
    let text = rowElements.map(el => el.textContent).join('\n');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  render() {
    return (
      <>
        <div className="ChampionResults">
          {this.renderPlayers(this.props.results.players)}
          
          <div className="ChampionResults-row"><b>BACKUPS:</b> {this.props.results.backups}</div>
        </div>
        <div>
          <button 
            className="ChampionResults-copy-button" 
            onClick={() => this.copyToClipboard()}>
            Copy to Clipboard
          </button>
        </div>
      </>
    );
  }
}

export default ChampionResults;
