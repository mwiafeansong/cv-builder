import React, { Component } from 'react';
import './App.css';
import Education from './Components/Education';
import Experience from './Components/Experience';
import Header from './Components/Header';
import Personal from './Components/Personal';
import Skill from './Components/Skills';

class App extends Component {
  constructor() {
    super();

    this.state = {
      previewMode: false,
    };
  }

  setPreviewMode = (bool) => {
    this.setState({
      previewMode: bool,
    });
  };

  render() {
    return (
      <div className="App">
        <Header setPreviewMode={this.setPreviewMode} />
        <main>
          <Personal previewMode={this.state.previewMode} />
          <Experience previewMode={this.state.previewMode} />
          <Education previewMode={this.state.previewMode} />
          <Skill previewMode={this.state.previewMode} />
          {this.state.previewMode && <button className="printCv">Print</button>}
        </main>
        <footer>
          Copyright &copy; 2023{' '}
          <a href="https://www.github.com/mwiafeansong">mwiafeansong</a>
        </footer>
      </div>
    );
  }
}
export default App;
