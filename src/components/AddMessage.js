import React from 'react'
import PropTypes from 'prop-types'
import * as actionCreators from '../actions/index';

function readFile(file) {
  let fileReader = new FileReader();
  //console.log(file);

  return new Promise((resolve, reject) => {
      fileReader.onload = e => {
          let dataURI = e.target.result;
          //console.log(dataURI);
          resolve(dataURI);
      }
      fileReader.onerror = () => reject('Ошибка чтения файла');
      fileReader.readAsDataURL(file); 
  })
}; 

function handleFileUpload(event) {
  return new Promise((resolve, reject) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);

    var now = new Date();
    var time = now.toDateString();

    var extension = file.name.split('.').pop().toLowerCase();
    console.log('hhh');
    if (extension === 'png' || extension === 'jpg') {
      readFile(file).then( function(resultic) {
        console.log('jpg');
        console.log(resultic);
        resolve(resultic); 
      });
    }
    else {
      resolve(file.name);
    }
  })
};

function geoposition() {
  function error() {
    alert('Error: Position hasn`t been detected');
  };

  function getPosition (opts) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, error, opts);
    });
  };
  return getPosition();
};

const AddMessage = (props) => {
  let input;

  return (
    <section id="new-message">
      <input
        onKeyPress={(e) => {
        if (e.key === 'Enter' & input.value !== '') {
          console.log(input.value)
          props.dispatch(input.value, 'Me', "text", null);
          input.value = ''
        }
      }}
        type="text"
        ref={(node) => {
        input = node
      }}
      />
      <button id="submit" onClick={(e) => {
        props.dispatch(input.value, 'Me', "text", null);
        input.value = ''
      }}>
        <img alt="" className="imgButton" src="https://image.flaticon.com/icons/svg/87/87413.svg"></img>
      </button>
      
      <button>
        <label htmlFor="attach" className="imgButton">
          <img alt="" className="imgButton" src="https://image.flaticon.com/icons/svg/149/149827.svg"></img>
        </label>
      </button>

      <input type="file" style={{display: 'none'}} onChange={(event) => {
        handleFileUpload(event).then( function(result, bool) {
          console.log(result);
          console.log(bool);

          if (result.length > 1000)
            props.dispatch('', 'Me', 'img', result);
          else
            props.dispatch(result, 'Me', 'text', null);

        });
      }} id="attach"/>

      <button id="geoposition" onClick={(event) => {
        geoposition().then(function(result) {
          props.dispatch('My latitude is ' + result.coords.latitude, 'Me', null, null);
        })
      }}>
        <img alt="" className="imgButton" src="https://image.flaticon.com/icons/svg/69/69433.svg"></img>
      </button>
    </section>
  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage
