import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';

Sentry.init({
   dsn: 'https://993f1d6e6b6c481f8a249285ae121044@sentry.io/1457398'
});

class SentryErrorLogger extends React.Component {
	state = {error: null};

	componentDidCatch(error, errorInfo) {
		this.setState({ error })
		Sentry.withScope(scope => {
			Object.entries(errorInfo).forEach(([key, value]) => {
				scope.setExtra(key, value);
			});
			Sentry.captureException(error);
		});
	}

	render() {
		if (this.state.error) {
			return(
				<p onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</p>
			)
		} else {
			return (<p/>);
		}
	}
}

export default SentryErrorLogger;