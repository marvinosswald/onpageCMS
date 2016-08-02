import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends React.Component {
    constructor(options=false){
        super();
        this.options = options;
        this.state = {
            open: true,
            loginDisabled: true,
            loginEmail:'',
            loginPassword: '',
            errorText: false
        };
        this.loginModalStyle = {
            width: '33%'
        }
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleClose () {
        this.setState({open: false});
    };
    executeLogin(){
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/api/cms/login');
        xhr.onload = () => {
            var res = JSON.parse(xhr.responseText);
            if (!res.error){
                this.setState({open: false});
                this.props.loginDone(res);
            }else{
                this.setState({errorText: res.error});
            }

        };
        let data = {
            email: this.state.loginEmail,
            password: this.state.loginPassword,
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        return xhr;
    }
    handlePasswordChange(e) {
        this.setState({loginPassword: e.target.value});

        if (this.state.loginEmail && this.state.loginPassword){
            this.setState({loginDisabled: false});
        }else{
            this.setState({loginDisabled: true});
        }
    }
    handleEmailChange(e) {
        this.setState({loginEmail: e.target.value})
    }
    handleEnter(e) {
        if (e.keyCode == 13){
            this.executeLogin();
        }
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="Login"
                primary={true}
                disabled={this.state.loginDisabled}
                onTouchTap={this.executeLogin.bind(this)}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Login"
                    actions={actions}
                    modal={true}
                    contentStyle={this.loginModalStyle}
                    open={this.state.open}
                >
                    <TextField floatingLabelText="Email" fullWidth={true} onChange={this.handleEmailChange.bind(this)} errorText={this.state.errorText}/><br/>
                    <TextField floatingLabelText="Password" type="password" fullWidth={true} onChange={this.handlePasswordChange.bind(this)} onKeyDown={this.handleEnter.bind(this)} errorText={this.state.errorText} /><br/>
                </Dialog>
            </div>

        )
    }
}
LoginModal.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
}