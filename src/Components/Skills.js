import React, { Component } from 'react';
import '../styles/Works.css';

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skill: {
        id: 1,
        name: '',
      },
      skills: [],
      showForm: false,
      callingId: '',
    };

    this.nameRef = React.createRef();

    this.displayForm = this.displayForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.submitInputs = this.submitInputs.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  displayForm = () => {
    this.setState({
      showForm: true,
    });
  };

  cancelForm = () => {
    this.setState({
      showForm: false,
    });
  };

  handleSkillChange = (e) => {
    this.setState({
      skill: {
        id: this.state.skill.id,
        name: e.target.value,
      },
    });
  };

  submitInputs = (e) => {
    e.preventDefault();

    this.setState({
      skills: this.state.skills.concat(this.state.skill),
      skill: {
        id: this.state.skill.id + 1,
        name: '',
      },
    });

    this.cancelForm();
  };

  removeItem = (e) => {
    var id = parseInt(e.target.id);

    const results = this.state.skills.filter((skill) => skill.id !== id);
    this.setState({
      skills: results,
    });
  };

  render() {
    const { skill, skills, showForm } = this.state;
    if (this.props.previewMode) {
      return (
        <section className="experience mySkills print">
          <h2>SKILLS</h2>
          <Overview
            skills={skills}
            handleRemove={this.removeItem}
            previewMode={this.props.previewMode}
          />
        </section>
      );
    } else {
      return (
        <section className="experience mySkills">
          <h2>SKILLS</h2>
          <Overview
            skills={skills}
            handleRemove={this.removeItem}
            previewMode={this.props.previewMode}
          />
          <button className="addBtn" onClick={this.displayForm}>
            Add
          </button>
          <div className="aForm">
            {showForm && (
              <form>
                <label htmlFor="skill">Skill</label>
                <input
                  type="text"
                  id="skill"
                  defaultValue={skill.name}
                  placeholder="Add a Skill"
                  onChange={this.handleSkillChange}
                  ref={this.nameRef}
                ></input>

                <div className="formBtns">
                  <button onClick={this.cancelForm}>Cancel</button>
                  <button type="submit" onClick={this.submitInputs}>
                    +Add
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      );
    }
  }
}

class Overview extends Component {
  render() {
    const { skills, handleRemove } = this.props;

    if (this.props.previewMode) {
      return (
        <ul>
          {skills.map((skill) => {
            return (
              <li key={skill.id} className="skillDets">
                <p>&#10004; {skill.name}</p>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <ul>
          {skills.map((skill) => {
            return (
              <li key={skill.id} className="skillDets">
                <p>&#10004; {skill.name}</p>
                <button id={skill.id} onClick={handleRemove}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default Skill;
