import React, {Component} from 'react';
import styles from './styles.module.css';


class Message extends Component {
	constructor(props) {
		super(props);

		this.state = {
			linkPreview: this.props.linkPreview[0],
			link: this.props.linkPreview[1],
		    ogImg: undefined,
		    ogTitle: undefined,
		    ogDesc: undefined
		};
	}

	componentDidMount() {
		if (this.state.linkPreview == true) {
			let url = this.state.link;

			var data = {
					jsonrpc: '2.0', 
					method: 'service_viewer', 
					params: {'url': url}, 
					id: '1'
			};

			var request = {
			    method: 'POST',
			    body: JSON.stringify(data),
			    headers: {
					'Access-Control-Allow-Origin':'*',
					'Content-Type': 'application/json',
				},
			};
			var newtxt;
			fetch('http://127.0.0.1:5000/api',request)
					.then(function(response)  {
						return response.json();
					})
					.then(data => {
						console.log(data);
						this.setState({ogImg: data.result.image});
						this.setState({ogDesc: data.result.desc});
						this.setState({ogTitle: data.result.title});
					});
		}
	}

	render() {
		if (this.state.linkPreview == true) {
			return (
				<div className={styles[this.props.author]}>
					<i>{this.props.author}</i> <i className={styles.date}>{this.props.date}</i>
					<a href={this.state.link}>
					<div className={styles.container} >
						<img className={styles.ogImg} alt='' src={this.state.ogImg} />
						<div className={styles.text_container}>
							<h2 className={styles.ogTitle}>{this.state.ogTitle}</h2>
							<p className={styles.ogDesc}>{this.state.ogDesc}</p>
						</div>
					</div>
					</a>
				</div>
			)
		}
		return (
			<div className={styles[this.props.author]}>
				<i>{this.props.author}</i> <i className={styles.date}>{this.props.date}</i>
				<div className={styles.emoji_message} dangerouslySetInnerHTML={this.props.handleEmoji(this.props.message)} />
				<img alt='' src={this.props.url} className={styles.img}/>
			</div>
		)
	}	
};

export default Message;