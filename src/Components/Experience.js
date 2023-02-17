import React, { Component } from 'react';
import '../styles/Works.css';

class Experience extends Component {
  constructor() {
    super();

    this.state = {
      experience: {
        id: 1,
        company: '',
        city: '',
        yearStarted: '',
        yearCompleted: '',
        role: '',
        jobDescription: '',
      },
      experiences: [],
      showForm: false,
      editMode: false,
      callingId: '',
    };

    this.companyRef = React.createRef();
    this.cityRef = React.createRef();
    this.yearStartedRef = React.createRef();
    this.yearCompletedRef = React.createRef();
    this.roleRef = React.createRef();
    this.jobDescriptionRef = React.createRef();

    this.displayForm = this.displayForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleYearStartedChange = this.handleYearStartedChange.bind(this);
    this.handleYearCompletedChange = this.handleYearCompletedChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleJobDescriptionChange =
      this.handleJobDescriptionChange.bind(this);
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
      editMode: false,
    });
  };

  handleCompanyChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        id: this.state.experience.id,
        company: e.target.value,
      },
    });
  };

  handleCityChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        city: e.target.value,
      },
    });
  };

  handleYearStartedChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        yearStarted: e.target.value,
      },
    });
  };

  handleYearCompletedChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        yearCompleted: e.target.value,
      },
    });
  };

  handleRoleChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        role: e.target.value,
      },
    });
  };

  handleJobDescriptionChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        jobDescription: e.target.value,
      },
    });
  };

  submitInputs = (e) => {
    e.preventDefault();

    this.setState({
      experiences: this.state.experiences.concat(this.state.experience),
      experience: {
        id: this.state.experience.id + 1,
        company: '',
        city: '',
        yearStarted: '',
        yearCompleted: '',
        role: '',
        jobDescription: '',
      },
    });

    this.cancelForm();
  };

  removeItem = (e) => {
    var id = parseInt(e.target.id);

    const results = this.state.experiences.filter((exp) => exp.id !== id);
    this.setState({
      experiences: results,
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

    this.state.experiences.forEach((exp) => {
      if (exp.id === id) {
        this.setState({
          experience: {
            id: exp.id,
            company: exp.company,
            city: exp.city,
            yearStarted: exp.yearStarted,
            yearCompleted: exp.yearCompleted,
            role: exp.role,
            jobDescription: exp.jobDescription,
          },
          callingId: exp.id,
        });
      }
    });
  };

  editTask = (e, callingId) => {
    e.preventDefault();

    const result = this.state.experiences.map((exp) => {
      if (exp.id === callingId) {
        exp.company = this.companyRef.current.value;
        exp.city = this.cityRef.current.value;
        exp.yearStarted = this.yearStartedRef.current.value;
        exp.yearCompleted = this.yearCompletedRef.current.value;
        exp.role = this.roleRef.current.value;
        exp.jobDescription = this.jobDescriptionRef.current.value;
      }
      return exp;
    });

    this.setState({
      experience: {
        id: this.state.experiences.length + 1,
        company: '',
        city: '',
        yearStarted: '',
        yearCompleted: '',
        role: '',
        jobDescription: '',
      },
      experiences: result,
      callingId: '',
    });

    this.removeEditBtn();
    this.cancelForm();
  };

  render() {
    const { experience, experiences, showForm, editMode, callingId } =
      this.state;

    if (this.props.previewMode) {
      return (
        <section className="experience">
          <h2>WORK EXPERIENCE</h2>
          <Overview
            experiences={experiences}
            handleRemove={this.removeItem}
            handleEdit={this.edit}
            previewMode={this.props.previewMode}
          />
        </section>
      );
    } else {
      return (
        <section className="experience">
          <h2>WORK EXPERIENCE</h2>
          <Overview
            experiences={experiences}
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
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  defaultValue={experience.company}
                  placeholder="Company Name"
                  onChange={this.handleCompanyChange}
                  ref={this.companyRef}
                ></input>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  defaultValue={experience.city}
                  onChange={this.handleCityChange}
                  ref={this.cityRef}
                ></input>
                <label htmlFor="yearStarted">From</label>
                <input
                  type="number"
                  id="yearStarted"
                  placeholder="YYYY"
                  defaultValue={experience.yearStarted}
                  onChange={this.handleYearStartedChange}
                  ref={this.yearStartedRef}
                ></input>
                <label htmlFor="yearCompleted">To</label>
                <input
                  type="text"
                  id="yearCompleted"
                  placeholder="YYYY or Present"
                  defaultValue={experience.yearCompleted}
                  onChange={this.handleYearCompletedChange}
                  ref={this.yearCompletedRef}
                ></input>
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  placeholder="Role"
                  defaultValue={experience.role}
                  onChange={this.handleRoleChange}
                  ref={this.roleRef}
                ></input>
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  rows="6"
                  id="jobDescription"
                  placeholder="Maximum of 3 sentences"
                  defaultValue={experience.jobDescription}
                  onChange={this.handleJobDescriptionChange}
                  ref={this.jobDescriptionRef}
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
      );
    }
  }
}

class Overview extends Component {
  render() {
    const { experiences, handleRemove, handleEdit } = this.props;

    if (this.props.previewMode) {
      return (
        <ul>
          {experiences.map((exp) => {
            return (
              <li key={exp.id}>
                <div className="dets">
                  <div>
                    <p>{exp.company}</p>
                    <p>{exp.city}</p>
                    <p>
                      {exp.yearStarted} - {exp.yearCompleted}
                    </p>
                  </div>
                  <div>
                    <h3>{exp.role}</h3>
                    <p>{exp.jobDescription}</p>
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
          {experiences.map((exp) => {
            return (
              <li key={exp.id}>
                <div className="dets">
                  <div>
                    <p>{exp.company}</p>
                    <p>{exp.city}</p>
                    <p>
                      {exp.yearStarted} - {exp.yearCompleted}
                    </p>
                  </div>
                  <div>
                    <h3>{exp.role}</h3>
                    <p>{exp.jobDescription}</p>
                  </div>
                </div>
                <div className="listBtns">
                  <button id={exp.id} onClick={handleRemove}>
                    Delete
                  </button>
                  <button id={exp.id} onClick={handleEdit}>
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

export default Experience;
