'use strict';
const Actions = require('./actions');
const Button = require('../../../components/form/button.jsx');
const ControlGroup = require('../../../components/form/control-group.jsx');
const LinkState = require('../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
const Spinner = require('../../../components/form/spinner.jsx');
const TextControl = require('../../../components/form/text-control.jsx');


const propTypes = {
    data: PropTypes.shape({
        password: PropTypes.string,
        passwordConfirm: PropTypes.string
    }),
    loading: PropTypes.bool,
    showSaveSuccess: PropTypes.bool,
    validation: PropTypes.shape({
        error: PropTypes.string,
        hasError: PropTypes.object,
        help: PropTypes.object
    })
};


class PasswordForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = props.data;
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.hasOwnProperty('data')) {
            this.setState(nextProps.data);
        }
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.savePassword({
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        });
    }

    render() {

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(
                <div key="success" className="alert alert-success">
                    Success. Changes have been saved.
                </div>
            );
        }

        if (this.props.validation.error) {
            alerts.push(
                <div key="danger" className="alert alert-danger">
                    {this.props.validation.error}
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit.bind(this)} method="post">
                <fieldset>
                    <legend>Password</legend>
                    {alerts}
                    <TextControl
                        name="password"
                        type="password"
                        label="New password"
                        value={this.state.password}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.validation.hasError.password}
                        help={this.props.validation.help.password}
                        disabled={this.props.loading}
                    />
                    <TextControl
                        name="passwordConfirm"
                        type="password"
                        label="Confirm new password"
                        value={this.state.passwordConfirm}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.validation.hasError.passwordConfirm}
                        help={this.props.validation.help.passwordConfirm}
                        disabled={this.props.loading}
                    />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                        <Button
                            type="submit"
                            inputClasses={{ 'btn-primary': true }}
                            disabled={this.props.loading}>

                            Set password
                            <Spinner
                                space="left"
                                show={this.props.loading}
                            />
                        </Button>
                    </ControlGroup>
                </fieldset>
            </form>
        );
    }
}

PasswordForm.propTypes = propTypes;


module.exports = PasswordForm;
