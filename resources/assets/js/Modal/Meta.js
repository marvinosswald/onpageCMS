import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MetaItem from '../Block/Meta';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class Meta extends React.Component {
    constructor(options=false){
        super();
        this.options = options;
        this.state = {
            open: false
        };
        this.metaModalStyle = {
            width: '33%'
        }
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleClose () {
        this.setState({open: false});
    };
    open(){
        this.setState({open: true});
    }
    render(){
        console.log(this.props.metaItems);
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />
        ];
        return (
            <div>
                <Dialog
                    title="Meta"
                    actions={actions}
                    modal={true}
                    contentStyle={this.metaModalStyle}
                    open={this.state.open}
                >
                    {Array.from(this.props.metaItems).map(function(e,index) {
                        return <MetaItem key={index} element={e} onSave={this.props.onSave}/>;
                    }.bind(this))}
                </Dialog>
            </div>

        )
    }
}
MetaModal.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
}