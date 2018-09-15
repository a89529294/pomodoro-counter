import React from "react";
import SettingModal from "./SetingModal";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tempPomodoroMinute: this.props.pomodoroMinute,
      tempBreakMinute: this.props.breakMinute
    };
  }

  handleFinalMinuteChange = event => {
    event.preventDefault();
    this.props.handleMinuteChange(
      this.state.tempPomodoroMinute,
      this.state.tempBreakMinute
    );
    this.toggleModal();
  };

  handlePomodoroMinuteChange = event => {
    if (event.target.value >= 0) {
      this.setState({
        tempPomodoroMinute: +event.target.value
      });
    }
  };
  handleBreakMinuteChange = event => {
    if (event.target.value >= 0) {
      this.setState({
        tempBreakMinute: +event.target.value
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      tempPomodoroMinute: this.props.pomodoroMinute,
      tempBreakMinute: this.props.breakMinute
    });
    this.toggleModal();
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    return (
      <div className="navbar">
        <h3 className="navbar-title">⏱️Pomodoro Counter</h3>
        <span className="navbar-button" onClick={this.toggleModal}>
          ⚙️Settings
        </span>
        <span className="navbar-button">🌍Lang</span>
        {this.state.showModal ? (
          <SettingModal>
            <div className="modal">
              <form onSubmit={this.handleFinalMinuteChange}>
                <fieldset>
                  <legend>Pomodoro Settings</legend>
                  <div className="label-input-container">
                    <label
                      className="label-duration"
                      htmlFor="pomodoro-duration"
                    >
                      Pomodoro Duration (min)
                    </label>
                    <input
                      className="input-duration"
                      type="number"
                      name="pomodoro-duration"
                      value={this.state.tempPomodoroMinute}
                      onChange={this.handlePomodoroMinuteChange}
                    />
                  </div>
                  <div className="label-input-container">
                    <label className="label-duration" htmlFor="break-duration">
                      Break Duration (min)
                    </label>
                    <input
                      className="input-duration"
                      type="number"
                      name="break-duration"
                      value={this.state.tempBreakMinute}
                      onChange={this.handleBreakMinuteChange}
                    />
                  </div>
                  <div className="modal-button-container">
                    <button type="submit" className="modal-button">
                      Confirm
                    </button>
                    <button
                      className="modal-button"
                      onClick={this.handleCloseModal}
                    >
                      Close Modal
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </SettingModal>
        ) : null}
      </div>
    );
  }
}

export default Nav;
