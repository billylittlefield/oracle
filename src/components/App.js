import React, { Component } from 'react';
import ChampionRandomizer from './ChampionRandomizer/index';
import { shuffle, wait } from '../util/util';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { results: null, numPlayers: 3, numPicks: 2, numBackups: 8 };
    this.champions = null;
  }

  async fetchVersion() {
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const json = await response.json();
    return json[0];
  }

  async fetchChampions(version) {
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
    const json = await response.json();
    return Object.keys(json.data);
  }

  async componentDidMount() {
    let version = await this.fetchVersion();
    let champions = await this.fetchChampions(version);
    this.champions = champions;
  }

  randomize() {
    let { numPicks, numPlayers, numBackups } = this.state;

    // Make sure the API requests have completed (there's probably a better way to do this...)
    while (this.champions === null) {
      wait(100);
    }

    // Shuffle the champs every time the button is clicked
    let champions = shuffle(this.champions);

    // Create "player objects" that contains picks, ban, and player number
    let players = Array.from(Array(numPlayers)).map((_, index) => {
      let picks = Array.from(Array(numPicks)).map(() => {
        return champions.pop();
      }).join(' or ');
      return {
        picks,
        ban: champions.pop(),
        playerNumber: index + 1
      };
    });

    // Create a string consisting of backups
    let backups = Array.from(Array(numBackups)).map(() => {
      return champions.pop();
    }).join(', ');

    let results = { players, backups };
    this.setState({ results });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ORACLE</h1>
          <h4>Let us join together and pray to RNGesus</h4>
        </header>
        <section>
          <ChampionRandomizer 
            results={this.state.results}
            onClick={this.randomize.bind(this)}
          />
        </section>
      </div>
    );
  }
}

export default App;
