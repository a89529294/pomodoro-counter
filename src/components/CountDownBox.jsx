import React from "react";
import Misc from "../api/misc";

class CountDownBox extends React.Component {
  constructor(props) {
    super(props);

    //check if todays pomodoro count exist. If it does, get the value, if it doesn't set it to 0.
    let pomodoroCount,
      takingABreak,
      currentDayPomodoroName = `pomodoro-count-${Misc.getCurrentDate()}`;

    //currentDayPomodoroName =: localstorage key name for today's pomodoro count
    if (localStorage.getItem(currentDayPomodoroName)) {
      pomodoroCount = +localStorage
        .getItem(currentDayPomodoroName)
        .substr(0, 1);
      takingABreak =
        "true" === localStorage.getItem(currentDayPomodoroName).substring(2);
    } else {
      localStorage.setItem(currentDayPomodoroName, "1-false");
      pomodoroCount = 1;
    }

    //delete previos pomodoro count.
    Misc.getObjOwnProperty(localStorage).forEach(item => {
      if (
        item !== currentDayPomodoroName &&
        item.substring(0, 14) === "pomodoro-count"
      ) {
        localStorage.removeItem(item);
      }
    });

    this.state = {
      pomodoroMinute: this.props.pomodoroMinute,
      pomodoroSecond: this.props.pomodoroSecond,
      breakMinute: this.props.breakMinute,
      breakSecond: this.props.breakSecond,
      running: false,
      paused: false,
      takingABreak: takingABreak,
      pomodoroCount: pomodoroCount
    };
    this.handleTimerStartOrResumeOrPause = this.handleTimerStartOrResumeOrPause.bind(
      this
    );
    this.handleTimerStop = this.handleTimerStop.bind(this);
    this.handlePomodoroCount = this.handlePomodoroCount.bind(this);
  }

  componentDidUpdate(preProps) {
    if (
      preProps.breakMinute !== this.props.breakMinute ||
      preProps.pomodoroMinute !== this.props.pomodoroMinute
    ) {
      this.setState({
        pomodoroMinute: this.props.pomodoroMinute,
        breakMinute: this.props.breakMinute,
        pomodoroSecond: this.props.pomodoroSecond,
        breakSecond: this.props.breakSecond
      });
    }
  }

  handlePomodoroCount() {
    const { takingABreak } = this.state;
    //does two things (1) popup informing user to take a break or go back to work (2) increase pomodorocount by 1 and save to localstorage
    takingABreak
      ? alert("Back to work!")
      : alert("Time's up! Enjoy your short break.");

    this.setState(function(prevState) {
      if (takingABreak) {
        localStorage.setItem(
          `pomodoro-count-${Misc.getCurrentDate()}`,
          prevState.pomodoroCount + 1 + "-false"
        );
        return {
          pomodoroCount: prevState.pomodoroCount + 1
        };
      } else {
        localStorage.setItem(
          `pomodoro-count-${Misc.getCurrentDate()}`,
          prevState.pomodoroCount + "-true"
        );
      }
    });
  }

  handleTimerStartOrResumeOrPause(event) {
    if (!this.state.paused && (!this.state.running || !event)) {
      //about to start the counter; initial state, using event to distinguish between recursive calls by setTimeout and user clicks to pause the counter.
      this.setState(function(prevState) {
        if (this.state.takingABreak) {
          let newMinute, newSecond;
          if (prevState.breakSecond === 0 && prevState.breakMinute === 0) {
            this.handlePomodoroCount();
            return {
              breakMinute: this.props.breakMinute,
              breakSecond: this.props.breakSecond,
              running: false,
              takingABreak: false
            };
          } else if (prevState.breakSecond === 0) {
            newMinute = prevState.breakMinute - 1;
            console.log(prevState.breakMinute);
            console.log(newMinute);
            newSecond = 59;
          } else {
            newMinute = prevState.breakMinute;
            newSecond = prevState.breakSecond - 1;
          }
          this.timerId = setTimeout(this.handleTimerStartOrResumeOrPause, 1000);
          return {
            breakMinute: newMinute,
            breakSecond: newSecond,
            running: true
          };
        } else {
          let newMinute, newSecond;
          if (
            prevState.pomodoroSecond === 0 &&
            prevState.pomodoroMinute === 0
          ) {
            this.handlePomodoroCount();
            return {
              pomodoroMinute: this.props.pomodoroMinute,
              pomodoroSecond: this.props.pomodoroSecond,
              running: false,
              takingABreak: true
            };
          } else if (prevState.pomodoroSecond === 0) {
            newMinute = prevState.pomodoroMinute - 1;
            newSecond = 59;
          } else {
            newMinute = prevState.pomodoroMinute;
            newSecond = prevState.pomodoroSecond - 1;
          }
          this.timerId = setTimeout(this.handleTimerStartOrResumeOrPause, 1000);
          return {
            pomodoroMinute: newMinute,
            pomodoroSecond: newSecond,
            running: true
          };
        }
      });
    } else if (!this.state.paused) {
      //running and not paused; user about to pause the counter
      window.clearInterval(this.timerId);
      this.setState({
        paused: true,
        running: false
      });
    } else {
      //not running and paused; user about to resume counter
      this.setState({
        paused: false,
        running: true
      });
      this.timerId = setTimeout(this.handleTimerStartOrResumeOrPause, 1000);
    }
  }

  handleTimerStop() {
    window.clearInterval(this.timerId);
    if (this.state.takingABreak) {
      this.setState({
        running: false,
        breakMinute: this.props.breakMinute,
        breakSecond: this.props.breakSecond,
        paused: false
      });
    } else {
      this.setState({
        running: false,
        pomodoroMinute: this.props.pomodoroMinute,
        pomodoroSecond: this.props.pomodoroSecond,
        paused: false
      });
    }
  }
  render() {
    let {
      breakMinute,
      breakSecond,
      pomodoroMinute,
      pomodoroSecond,
      pomodoroCount,
      running,
      paused,
      takingABreak
    } = this.state;

    return (
      <div
        className={
          takingABreak
            ? "countdown-container countdown-container-break"
            : "countdown-container"
        }
      >
        <div className="pomodoro-count">
          {takingABreak ? "Break " : "Pomodoro "}#{pomodoroCount}
        </div>
        <span className="countdown-time">
          {takingABreak
            ? breakMinute < 10
              ? "0" + breakMinute
              : breakMinute
            : pomodoroMinute < 10
              ? "0" + pomodoroMinute
              : pomodoroMinute}
          :
          {takingABreak
            ? breakSecond < 10
              ? "0" + breakSecond
              : breakSecond
            : pomodoroSecond < 10
              ? "0" + pomodoroSecond
              : pomodoroSecond}
        </span>
        <div className="button-container">
          <button
            className="button"
            onClick={this.handleTimerStartOrResumeOrPause}
          >
            {paused ? "resume" : running ? "pause" : "start"}
          </button>
          <button
            className="button"
            onClick={this.handleTimerStop}
            disabled={!this.state.running}
          >
            stop
          </button>
        </div>
      </div>
    );
  }
}

export default CountDownBox;
