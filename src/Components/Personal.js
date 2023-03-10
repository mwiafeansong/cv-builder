import React, { Component } from 'react';
import '../styles/Personal.css';

class Personal extends Component {
  constructor() {
    super();

    this.state = {
      firstName: 'John',
      lastName: 'Doe',
      address: 'john doe street',
      email: 'you@example.com',
      phone: '555-555-555',
      showForm: false,
    };

    this.editForm = this.editForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.addressRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  editForm = () => {
    this.setState({
      showForm: true,
    });
  };

  cancelForm = () => {
    this.setState({
      showForm: false,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    this.setState({
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      address: this.addressRef.current.value,
      email: this.emailRef.current.value,
      phone: this.phoneRef.current.value,
    });

    this.cancelForm();
  };

  render() {
    const { firstName, lastName, address, email, phone, showForm } = this.state;

    if (this.props.previewMode) {
      return (
        <div className="container">
          <section className="personal print">
            <div className="details">
              <div className="nameDetails">
                <p>{firstName}</p>
                <p>{lastName}</p>
              </div>
              <div className="contactInfoDetails">
                <p>{address}</p>
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div className="container">
          <section className="personal">
            <div className="details">
              <div className="nameDetails">
                <p>{firstName}</p>
                <p>{lastName}</p>
              </div>
              <div className="contactInfoDetails">
                <p>{address}</p>
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </div>
            <button onClick={this.editForm}>Edit</button>
            <div className="aForm">
              {showForm && (
                <form onSubmit={this.submitForm}>
                  <div className="names">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue={firstName}
                      ref={this.firstNameRef}
                    ></input>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue={lastName}
                      ref={this.lastNameRef}
                    ></input>
                  </div>
                  <div className="contactInfo">
                    <label htmlFor="address1">Address</label>
                    <input
                      type="text"
                      id="address1"
                      defaultValue={address}
                      ref={this.addressRef}
                    ></input>
                    <label htmlFor="mail">Email</label>
                    <input
                      type="email"
                      id="mail"
                      defaultValue={email}
                      ref={this.emailRef}
                    ></input>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      defaultValue={phone}
                      ref={this.phoneRef}
                    ></input>
                  </div>
                  <div className="formBtns">
                    <button onClick={this.cancelForm}>Cancel</button>
                    <button type="submit">+Add</button>
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

export default Personal;
