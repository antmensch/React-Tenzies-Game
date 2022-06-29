import React from 'react';
import "./Dice.css";

function Dice(props) {
  let diceFaces = [
    // 1 dot
    (<div   onClick={props.onClick}
            style={props.isHeld ? {backgroundColor: "#59e391"} : {}}
            className="dice first-face">
        <span className="dot"> </span>
    </div>),

    // 2 dots
    (<div   onClick={props.onClick}
            style={props.isHeld ? {backgroundColor: "#59e391"} : {}}
            className="dice second-face">
        <span className="dot"> </span>
        <span className="dot"> </span>
    </div>),

    // 3 dots
    (<div   onClick={props.onClick}
            style={props.isHeld ? {backgroundColor: "#59e391"} : {}}
            className="dice third-face">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
    </div>),

    // 4 dots
    (<div   onClick={props.onClick}
            style={props.isHeld ? {backgroundColor: "#59e391"} : {}}
            className="fourth-face dice">
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            </div>
    </div>),

    // 5 dots
    (<div   onClick={props.onClick}
            style={props.isHeld ? {backgroundColor: "#59e391"} : {}}
            className="fifth-face dice">
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
        </div>
    <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
    </div>
    </div>),

    //6 dots
    (<div   onClick={props.onClick}
            style={props.isHeld ? {backgroundColor: "#59e391"} : {}}
            className="fourth-face dice">
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    </div>)

  ]
  
    return diceFaces[props.value - 1];
}

export default Dice