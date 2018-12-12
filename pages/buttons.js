import React from 'react'

class VoteButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            choices: props,
            selected: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.alarm = this.alarm.bind(this);
    }

    render() {
        const choicesList = this.props.choices.map((choice) => 
            <button key={choice} onClick={() => this.alarm(choice)}>{choice}</button>
        )

        return (
            <div>
                { this.state.selected }
                { choicesList }
            </div>
        )
    }

    alarm(clicked) {
        this.setState(
            state => ({
                selected: clicked
            })
        )

        alert('you clicked ' + clicked)

        // also, notify the parent
        this.props.cb(clicked)
    }
}

export default VoteButtons