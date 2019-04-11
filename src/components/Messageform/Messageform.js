import React from 'react';
import styles from './styles.module.css';

const messageForm = (props) => {
    return (
        <section className={styles.new_message}>
            <button onClick={props.handleOpenEmojiViewer}>
                <img alt="Emoji" className={styles.imgButton} src="https://cdn2.iconfinder.com/data/icons/emoji-outline-1/32/emoji-icon-01-512.png"></img>
            </button>

            <textarea cols className={styles.text_zone} onChange={props.handleChange} onSubmit={props.handleSubmit} type="text" value={props.value}/>

            <button onClick={props.handleSubmit}>
                <img alt="send" className={styles.imgButton} src="https://image.flaticon.com/icons/svg/87/87413.svg"></img>
            </button>
            
            <button>
                <label htmlFor="attach">
                    <img alt="attach" className={styles.imgButton} src="https://image.flaticon.com/icons/svg/149/149827.svg"></img>
                </label>
            </button>

            <button onClick={props.handleGeoposition}>
                <img alt="geoposition" className={styles.imgButton} src="https://image.flaticon.com/icons/svg/69/69433.svg"></img>
            </button>
        </section>
      );
};

export default messageForm;