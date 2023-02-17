import React, { Component } from 'react';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      editClicked: true,
      previewClicked: false,
    };

    this.changeView = this.changeView.bind(this);
  }

  changeView = (e) => {
    if (e.target.classList.contains('edit')) {
      this.props.setPreviewMode(false);
      this.setState({
        editClicked: true,
        previewClicked: false,
      });
    } else if (e.target.classList.contains('preview')) {
      this.props.setPreviewMode(true);
      this.setState({
        editClicked: false,
        previewClicked: true,
      });
    }
  };

  render() {
    const { editClicked, previewClicked } = this.state;
    return (
      <header>
        <h1>CV Builder</h1>
        <div className="btns">
          <button
            className={editClicked ? 'btn edit clicked' : 'btn edit'}
            onClick={this.changeView}
          >
            Edit Mode
          </button>
          <button
            className={previewClicked ? 'btn preview clicked' : 'btn preview'}
            onClick={this.changeView}
          >
            Preview Mode
          </button>
        </div>
      </header>
    );
  }
}

// class Button extends Component {
//   constructor(props) {
//     super(props);

//     // this.changeBgColor = this.changeBgColor.bind(this);
//   }

//   // changeBgColor = (e) => {
//   //   e.target.classList.add('clicked');
//   // };

//   render() {
//     return (
//       <button className="btn" onClick={this.props.changeView}>
//         {this.props.name}
//       </button>
//     );
//   }
// }

export default Header;
