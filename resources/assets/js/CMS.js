import CMSComponent from './CMSComponent';
import LoginModal from './LoginModal';
import MetaModal from './MetaModal';
import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new';
import MetaIcon from 'material-ui/svg-icons/action/receipt';




const menuStyle={
    position: "absolute",
    right: "10px",
    bottom: "10px"
};

export default class CMS extends React.Component{
    constructor(options=false){
        super();
        this.elements = document.body.querySelectorAll('cms');
        this.options = options;
        this.state = {
            notificationOpen: false,
            menuStyle: {display: "none"}
        };
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleSave(){
        this.setState({notificationOpen: true});
    }
    handleLoginDone(loginInfo){
        this.accessToken = loginInfo.token;
        this.setState({menuStyle: menuStyle});
    }
    activate(){
        for (let i = 0; i < this.elements.length; i++){
            const e = this.elements[i];
            ReactDOM.render(
                <CMSComponent id={e.id} html={e.textContent} onSave={this.handleSave.bind(this)} accessToken={this.accessToken} />,
                e
            );
        }
    }
    openMetaModal(){
        this.refs.metaModal.open();
    }
    handleLogout (){
        location.reload();
    }
    render(){
        return (
            <div>
                <LoginModal loginDone={this.handleLoginDone.bind(this)}/>
                <MetaModal ref="metaModal" metaItems={document.querySelectorAll('.cms-meta')} onSave={this.handleSave.bind(this)}/>
                <Snackbar
                    open={this.state.notificationOpen}
                    message="Item saved"
                    bodyStyle={{fontWeight: "bold"}}
                    autoHideDuration={4000}
                />
                <IconMenu
                    iconButtonElement={<FloatingActionButton>
                        <IconButton><Fingerprint color="#fff" /></IconButton>
                    </FloatingActionButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    style={this.state.menuStyle}
                >
                    <MenuItem
                        primaryText="Edit Mode"
                        onTouchTap={this.activate.bind(this)}
                        leftIcon={<EditIcon/>}
                    />
                    <MenuItem leftIcon={<MetaIcon/>} primaryText="Meta" onTouchTap={this.openMetaModal.bind(this)} />
                    <Divider/>
                    <MenuItem leftIcon={<PowerIcon/>} primaryText="Sign out" onTouchTap={this.handleLogout.bind(this)} />
                </IconMenu>

            </div>

        )
    }


}
CMS.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
}