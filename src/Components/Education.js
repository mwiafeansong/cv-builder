import React, { Component } from 'react';
import '../styles/Works.css';

class Education extends Component {
  constructor() {
    super();

    this.state = {
      education: {
        id: 1,
        school: '',
        city: '',
        yearStarted: '',
        yearCompleted: '',
        degree: '',
        achievements: '',
      },
      educations: [],
      showForm: false,
      editMode: false,
      callingId: '',
    };

    this.schoolRef = React.createRef();
    this.cityRef = React.createRef();
    this.yearStartedRef = React.createRef();
    this.yearCompletedRef = React.createRef();
    this.degreeRef = React.createRef();
    this.achievementsRef = React.createRef();

    this.displayForm = this.displayForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleYearStartedChange = this.handleYearStartedChange.bind(this);
    this.handleYearCompletedChange = this.handleYearCompletedChange.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleAchievementsChange = this.handleAchievementsChange.bind(this);
    this.submitInputs = this.submitInputs.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.edit = this.edit.bind(this);
    this.editTask = this.editTask.bind(this);
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

  handleSchoolChange = (e) => {
    this.setState({
      education: {
        ...this.state.education,
        id: this.state.education.id,
        school: e.target.value,
      },
    });
  };

  handleCityChange = (e) => {
    this.setState({
      education: {
        ...this.state.education,
        city: e.target.value,
      },
    });
  };

  handleYearStartedChange = (e) => {
    this.setState({
      education: {
        ...this.state.education,
        yearStarted: e.target.value,
      },
    });
  };

  handleYearCompletedChange = (e) => {
    this.setState({
      education: {
        ...this.state.education,
        yearCompleted: e.target.value,
      },
    });
  };

  handleDegreeChange = (e) => {
    this.setState({
      education: {
        ...this.state.education,
        degree: e.target.value,
      },
    });
  };

  handleAchievementsChange = (e) => {
    this.setState({
      education: {
        ...this.state.education,
        achievements: e.target.value,
      },
    });
  };

  submitInputs = (e) => {
    e.preventDefault();

    this.setState({
      educations: this.state.educations.concat(this.state.education),
      education: {
        id: this.state.education.id + 1,
        school: '',
        city: '',
        yearStarted: '',
        yearCompleted: '',
        degree: '',
        achievements: '',
      },
    });

    this.cancelForm();
  };

  removeItem = (e) => {
    var id = parseInt(e.target.id);

    const results = this.state.educations.filter((educ) => educ.id !== id);
    this.setState({
      educations: results,
    });
  };

  displayEditBtn = () => {
    this.setState({
      editMode: true,
    });
  };

  removeEditBtn = () => {
    this.setState({
      editMode: false,
    });
  };

  edit = (e) => {
    this.displayEditBtn();
    this.displayForm();
    var id = parseInt(e.target.id);

    this.state.educations.forEach((educ) => {
      if (educ.id === id) {
        this.setState({
          education: {
            id: educ.id,
            school: educ.school,
            city: educ.city,
            yearStarted: educ.yearStarted,
            yearCompleted: educ.yearCompleted,
            degree: educ.degree,
            achievements: educ.achievements,
          },
          callingId: educ.id,
        });
      }
    });
  };

  editTask = (e, callingId) => {
    e.preventDefault();

    const result = this.state.educations.map((educ) => {
      if (educ.id === callingId) {
        educ.school = this.schoolRef.current.value;
        educ.city = this.cityRef.current.value;
        educ.yearStarted = this.yearStartedRef.current.value;
        educ.yearCompleted = this.yearCompletedRef.current.value;
        educ.degree = this.degreeRef.current.value;
        educ.achievements = this.achievementsRef.current.value;
      }
      return educ;
    });

    this.setState({
      education: {
        id: this.state.educations.length + 1,
        school: '',
        city: '',
        yearStarted: '',
        yearCompleted: '',
        degree: '',
        achievements: '',
      },
      educations: result,
      callingId: '',
    });

    this.removeEditBtn();
    this.cancelForm();
  };

  render() {
    const { education, educations, showForm, editMode, callingId } = this.state;

    if (this.props.previewMode) {
      return (
        <div className="educContainer">
          <section className="experience education">
            <h2>EDUCATION</h2>
            <Overview
              educations={educations}
              handleRemove={this.removeItem}
              handleEdit={this.edit}
              previewMode={this.props.previewMode}
            />
          </section>
        </div>
      );
    } else {
      return (
        <div className="educContainer">
          <section className="experience education">
            <h2>EDUCATION</h2>
            <Overview
              educations={educations}
              handleRemove={this.removeItem}
              handleEdit={this.edit}
              previewMode={this.props.previewMode}
            />
            <button className="addBtn" onClick={this.displayForm}>
              Add
            </button>
            <div className="aForm">
              {showForm && (
                <form>
                  <label htmlFor="schoolName">School Name</label>
                  <input
                    type="text"
                    id="schoolName"
                    defaultValue={education.school}
                    placeholder="School Name"
                    onChange={this.handleSchoolChange}
                    ref={this.schoolRef}
                  ></input>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    defaultValue={education.city}
                    onChange={this.handleCityChange}
                    ref={this.cityRef}
                  ></input>
                  <label htmlFor="yearStarted">From</label>
                  <input
                    type="number"
                    id="yearStarted"
                    placeholder="YYYY"
                    defaultValue={education.yearStarted}
                    onChange={this.handleYearStartedChange}
                    ref={this.yearStartedRef}
                  ></input>
                  <label htmlFor="yearCompleted">To</label>
                  <input
                    type="text"
                    id="yearCompleted"
                    placeholder="YYYY or Present"
                    defaultValue={education.yearCompleted}
                    onChange={this.handleYearCompletedChange}
                    ref={this.yearCompletedRef}
                  ></input>
                  <label htmlFor="degree">Degree/ Diploma/ Certificate</label>
                  <input
                    type="text"
                    id="degree"
                    placeholder="Degree"
                    defaultValue={education.degree}
                    onChange={this.handleDegreeChange}
                    ref={this.degreeRef}
                  ></input>
                  <label htmlFor="achievements">Achievements</label>
                  <textarea
                    rows="6"
                    id="achievements"
                    placeholder="Maximum of 3 sentences"
                    defaultValue={education.achievements}
                    onChange={this.handleAchievementsChange}
                    ref={this.achievementsRef}
                  ></textarea>
                  <div className="formBtns">
                    <button onClick={this.cancelForm}>Cancel</button>
                    {!editMode && (
                      <button type="submit" onClick={this.submitInputs}>
                        +Add
                      </button>
                    )}
                    {editMode && (
                      <button
                        type="submit"
                        onClick={(e) => this.editTask(e, callingId)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      );
    }
  }
}

class Overview extends Component {
  render() {
    const { educations, handleRemove, handleEdit } = this.props;

    if (this.props.previewMode) {
      return (
        <ul>
          {educations.map((educ) => {
            return (
              <li key={educ.id}>
                <div className="dets">
                  <div>
                    <p>{educ.school}</p>
                    <p>{educ.city}</p>
                    <p>
                      {educ.yearStarted} - {educ.yearCompleted}
                    </p>
                  </div>
                  <div>
                    <h3>{educ.degree}</h3>
                    <p>{educ.achievements}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <ul>
          {educations.map((educ) => {
            return (
              <li key={educ.id}>
                <div className="dets">
                  <div>
                    <p>{educ.school}</p>
                    <p>{educ.city}</p>
                    <p>
                      {educ.yearStarted} - {educ.yearCompleted}
                    </p>
                  </div>
                  <div>
                    <h3>{educ.degree}</h3>
                    <p>{educ.achievements}</p>
                  </div>
                </div>
                <div className="listBtns">
                  <button id={educ.id} onClick={handleRemove}>
                    Delete
                  </button>
                  <button id={educ.id} onClick={handleEdit}>
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default Education;
