import React, {PureComponent} from 'react';
import Person from '../Persons/Person/Person';

class Persons extends PureComponent {

	constructor(props) {
		super(props);
		console.log('[Persons.js] Inside Constructor', props);
		this.lastPersonsRef = React.createRef();
	}

	componentWillMount() {
		console.log('[Persons.js] Inside componentWillMount()')
	}

	componentDidMount() {
		console.log('[Persons.js] Inside componentDidMount()');
		this.lastPersonsRef.current.focus();
	}

	componentWillReceiveProps(nextProps) {
		console.log('[UPDATE Persons.js] Inside componentWillReceiveProps()', nextProps)
	}

	/*
	shouldComponentUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside shouldComponentUpdate()', nextProps, nextState);
		return nextProps.persons !== this.props.persons ||
			nextProps.changed !== this.props.changed ||
			nextProps.clicked !== this.props.clicked;
		//return true;
	}
	*/

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside componentWillUpdate()', nextProps, nextState);
	}

	componentDidUpdate() {
		console.log('[UPDATE Persons.js] Inside componentDidUpdate()');
	}

	render() {
		console.log('[Persons.js] Inside render()');
		return (
			this.props.persons.map((person, index) => {
				return <Person click={() => this.props.clicked(index)}
							   name={person.name}
							   age={person.age}
							   ref={this.lastPersonsRef}
							   key={person.id}
							   position={index}
							   changed={(event) => this.props.changed(event, person.id)}/>
			})
		);
	}
}

export default Persons;