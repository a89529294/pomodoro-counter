import React from "react";
import Carousel from "nuka-carousel";
const style = {
  textAlign: "center"
};

const ulistStyle = {
  paddingLeft: "100px",
  paddingBottom: "50px"
};

const pStyle = {
  paddingLeft: "100px",
  paddingRight: "100px"
};

export default class extends React.Component {
  render() {
    return (
      <Carousel autoplay={true} initialSlideHeight={5000}>
        <div>
          <div style={style}>
            <h1>What is it?</h1>
          </div>
          <div style={pStyle}>
            <p>
              The Pomodoro Technique is a time management method that can be
              used for any task. For many people, time is an enemy. The anxiety
              triggered by “the ticking clock”, especially when it involves a
              deadline, leads to ineffective work and study habits which in turn
              lead to procrastination.
            </p>
            <p>
              The aim of the Pomodoro Technique is to use time as a valuable
              ally in accomplishing what we want to do in the way we want to do
              it, and to enable us to improve continually the way we work or
              study.
            </p>
          </div>
        </div>
        <div>
          <div style={style}>
            <h1>The Goals</h1>
          </div>
          <div style={ulistStyle}>
            The Pomodoro Technique will provide a simple tool/process for
            improving productivity (your own and that of your team members)
            which can do the following:
            <ul>
              <li>Alleviate anxiety linked to beginning</li>
              <li>
                Enhance focus and concentration by cutting down on interruptions
              </li>
              <li>Increase awareness of your decisions</li>
              <li> Boost motivation and keep it constant</li>
              <li>Bolster the determination to achieve your goals</li>
              <li>
                Refine the estimation process, both in qualitative and
                quantitative terms
              </li>
              <li>Improve your work or study process</li>
              <li>
                Strengthen your resolve to keep on applying yourself in the face
                of complex situations
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div style={style}>
            <h1>The Basics</h1>
          </div>
          <div style={pStyle}>
            <p>
              At the beginning of each day select the tasks you need to complete
              and put them on the TODO list above.
            </p>
            <p>Start working:</p>
            <ol>
              <li>Start the Pomodoro timer</li>
              <li>Work until the Pomodoro rings</li>
              <li>Take a short break (3-5 minutes)</li>
            </ol>
          </div>
        </div>
      </Carousel>
    );
  }
}
