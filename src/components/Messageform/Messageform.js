import React from 'react';

const messageForm = (props) => {

  return (
    <section id="new-message">
      <button id="emoji-button" onClick={props.handleOpenEmojiViewer}>
        <img className="imgButton" src="https://cdn2.iconfinder.com/data/icons/emoji-outline-1/32/emoji-icon-01-512.png"></img>
      </button>
      <input onChange={props.handleChange} onSubmit={props.handleSubmit} type="text" value={props.value}/>

      <button id="submit" onClick={props.handleSubmit}>
        <img alt="" className="imgButton" src="https://image.flaticon.com/icons/svg/87/87413.svg"></img>
      </button>
      
      <button>
        <label htmlFor="attach" className="imgButton">
          <img alt="" className="imgButton" src="https://image.flaticon.com/icons/svg/149/149827.svg"></img>
        </label>
      </button>

      <input type="file" style={{display: 'none'}} onChange={props.handleFileUpload} id="attach"/>

      <button id="geoposition" onClick={props.handleGeoposition}>
        <img alt="" className="imgButton" src="https://image.flaticon.com/icons/svg/69/69433.svg"></img>
      </button>
    </section>
  );
};

export default messageForm;