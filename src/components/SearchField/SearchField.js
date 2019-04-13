import React from 'react';
import styles from './styles.module.css';

const RegFields = (props) => {

  return (
    <section className={styles.search_component}>
    	<form onSubmit={props.handleSubmit}>
			<input onChange={props.handleChange} value={props.value} className={styles.search} placeholder="search" type="text"></input>
		</form>
    </section>
  );
};

export default RegFields;