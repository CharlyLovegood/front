import React, { Component } from 'react';
import Messages from '../../components/Messages/Messages'
import { Route } from 'react-router-dom';
import MessagePage from '../../components/Messages/MessagePage/MessagePage';


class MessagesContainer extends Component {
  state = {
    value:'',
    chat_id: 1
  };

  constructor(props) {
    super(props);
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    this.fillForm = this.fillForm.bind(this);
    this.setState({chat_id: Number(props.id)});
    var mes = MessagesContainer.createMessages(props.id);
    this.state = ({messages: mes})
  };

  static createMessages(id) {
    var now = new Date();
    var time = now.toDateString();

    var chat_id = id;
    return new Array(5).fill(null).map((item, index) => {
      return {
        text: "newMes from chat#" + id,
        file: null,
        url: null,
        time: time,
        status: "...",
        reciever: "mesForMe"
      }
    })
  };


  handleChange(event) {
    this.setState({value: event.target.value});
  };


  handleSubmit(event) {
    event.preventDefault();

    if (this.state.value != '') {
      var now = new Date();
      var time = now.toDateString();

      var messages = this.state.messages;

      var newPack = {
        text: this.state.value,
        file: null,
        url: null,
        time: time,
        status: "...",
        reciever: "myMes"
      };

      messages =  messages.concat([newPack]);
      this.setState({messages}); 
      this.setState({value: ''});  
    }
  };

  static readFile(file) {
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

  handleFileUpload(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);

    var now = new Date();
    var time = now.toDateString();

    var extension = file.name.split('.').pop().toLowerCase();
        
    if (extension == 'png' || extension == 'jpg') {
      MessagesContainer.readFile(file).then( function(resultic) {
        newPack = {
          text: '',
          file: file,
          url: resultic,
          time: time,
          status: "...",
          reciever: "myMes"
        };
        return newPack; 
      }).then(newPack => this.setState( {messages: this.state.messages.concat([newPack])}));
    }
    else {
      var newPack = {
        text: 'File: ' + file.name + ', size: ' + file.size + ' Byte.',
        file: null,
        url: null,
        time: time,
        status: "...",
        reciever: "myMes"
      };
      var messages = this.state.messages;
      messages =  messages.concat([newPack]);
      this.setState({messages});
    }
  };


  fillForm(event) {
    event.preventDefault();
    MessagesContainer.geoposition().then(result => this.setState({value: 'My Latitude is ' + result.coords.latitude}));
  };


  static geoposition() {
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


  render() {

    return (
      <div id="app">
        <div className="content">
          <Messages  messages={this.state.messages} changeMessageStatus={(id, message) => this.changeMessageStatus(id, message)}/>
        </div>
        <message-form>
          <form  id="MesForm" onSubmit={this.handleSubmit}>
            <input type="text" onSubmit={this.handleSubmit} value={this.state.value} onChange={this.handleChange} placeholder="Сообщение" />
            <button id="submit">
              <img className="imgButton" src="https://icon-icons.com/icons2/933/PNG/512/send-button_icon-icons.com_72565.png"></img>
            </button>
            <label htmlFor="attach" className="attachButton">
              <img className="imgButton" src="https://cdn.icon-icons.com/icons2/933/PNG/512/attachment-clip_icon-icons.com_72870.png"></img>
            </label>
            <input type="file" style={{display: 'none'}} onChange={this.handleFileUpload} id="attach"/>
            <button id="geoposition" onClick={this.fillForm}>
              <img className="imgButton" src="https://cdn4.iconfinder.com/data/icons/contact-and-address-1/32/contact-05-512.png"></img>
            </button>
          </form>
        </message-form>
      </div>
    )
  }
}
export default MessagesContainer;