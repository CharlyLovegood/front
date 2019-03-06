import React, { Component } from 'react';
import MessageForm from './../../components/Messageform/Messageform';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'

import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
import globalSprite from 'svg-sprite-loader/runtime/sprite';
import EmojiViewer from '../EmojiViewer/EmojiViewer'


function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}



class AddMessage extends Component {
  state = {
    value: '',
    showEmojiViewer: false,
    emojiWasMentioned: false
  };

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value}) 
  };


  readFile(file) {
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


  handleSubmit(event) {
    console.log('submit');
    console.log(this.props.match.params.chat_id);

    event.preventDefault();
    console.log(this.state.value);
 
    if (this.state.value !== '' && this.state.emojiWasMentioned === false) {
      var userId = getCookie('userID');

      var data = {
          jsonrpc: '2.0', 
          method: 'create_message', 
          params: {"user_id_sender": userId, "chat_id": this.props.match.params.chat_id, "content": this.state.value}, 
          id: '1',
      };

      var request = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json",
        },
      };

      fetch('http://127.0.0.1:5000/api',request)
          .then(function(response)  {
            console.log(response);
          })
      console.log(this.state.value);
      this.props.AddMessage(this.state.value, 'Me', 63, "text", null);
      this.setState({value: ''});
    } 
    if (this.state.value !== '' && this.state.emojiWasMentioned === true) {
      console.log(this.state.value);
      this.props.AddMessage(this.state.value, 'Me', 63, "text", null);
      this.setState({value: ''});
    }    
  };

  fileUpload(event) {
    return new Promise((resolve, reject) => {
      event.preventDefault();
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.readAsDataURL(file);

      // var now = new Date();
      // var time = now.toDateString();

      var extension = file.name.split('.').pop().toLowerCase();
      console.log('hhh');
      if (extension === 'png' || extension === 'jpg') {
        this.readFile(file).then( function(resultic) {
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


  handleFileUpload(event) {
    this.fileUpload(event).then((result) => {
      console.log(result);
      if (result.length > 1000)
        this.props.AddMessage('', 'Me', 63, 'img', result);
      else
        this.props.AddMessage(result, 'Me', 63, 'text', null);

    });
  };

  geoposition() {
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


  handleGeoposition() {
    console.log('geo')
    this.geoposition().then(result => {
    console.log(result);
    this.props.AddMessage('My latitude is ' + result.coords.latitude, 'Me', 63, null, null)      
  })};


  handleOpenEmojiViewer() {
    this.setState({showEmojiViewer: !this.state.showEmojiViewer})
  };


  handleEmojiClick = (emojiCode) => {
    console.log('EMOJI----------------'+emojiCode);
    this.setState({emojiWasMentioned: true});
    this.setState({value: this.state.value + "::" + emojiCode + "::"})
    
  };


  render() {
    return (
      <div id="AddMessage-div">
        {this.state.showEmojiViewer === true ? <EmojiViewer handleEmojiClick={this.handleEmojiClick}/> : <div />}
        <MessageForm value={this.state.value} handleSubmit={(event) => this.handleSubmit(event)} 
                                        handleFileUpload={(event) => this.handleFileUpload(event)} 
                                        handleGeoposition={(event) => this.handleGeoposition(event)}
                                        handleChange={(event) => this.handleChange(event)}
                                        handleOpenEmojiViewer={(event) => this.handleOpenEmojiViewer(event)}/>
      
      </div>

    );
  };
}

const mapDispatchToProps = (dispatch) => {
  return  {
    AddMessage: (message, author, chatId, filename, url) => dispatch(actions.addMessage(message, author, chatId, filename, url))
  }
};

const mapStateToProps = state => {
  return {
    
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);