import React from 'react';
import TextField from 'material-ui/TextField';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class Meta extends React.Component {
    constructor(options=false){
        super();
        this.options = options;
        var cmsString = this.options.element.id.split('-');
        this.block = cmsString[4];
        this.path = cmsString[2];
        this.language= cmsString[1];
        this.state = {
            input: this.options.element.innerText
        }
    }
    handleChange(e){
        this.setState({input:e.target.value});
        document.getElementById(this.options.element.id).innerHTML = e.target.value;
    }
    sync(){
         var xhr = new XMLHttpRequest();
         xhr.open('PUT','/api/cms?token='+this.props.accessToken);
         xhr.onload = () => {
            this.props.onSave();
        };
         let data = {
            path: this.path,
            block: 'Meta'+this.block.capitalize(),
            content: this.state.input,
            language: this.language
        };
         xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
         xhr.setRequestHeader('Content-Type', 'application/json');
         xhr.send(JSON.stringify(data));
         return xhr;
    }
    render(){
        return (
            <div>
                <TextField
                    floatingLabelText={this.block}
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.sync.bind(this)}
                    value={this.state.input}
                />
            </div>
        )
    }
}