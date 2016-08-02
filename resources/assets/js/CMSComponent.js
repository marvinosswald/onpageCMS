import React from 'react';
import ReactDOM from 'react-dom';


export default class CMSComponent extends React.Component{
    constructor(options=false){
        super();
        this.options = options;
        this.state = {
            editable: true
        };
        //this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);

    }
    /*
    handleDoubleClick(){
        this.setState({editable: true});
    }
    */
    handleOnBlur(){
        this.setState({editable: false});
        this.state.html = this.htmlEl.innerHTML;
        var splittedId = this.props.id.split('-');
        this.block = splittedId[3];
        this.path = splittedId[2];
        this.language= splittedId[1];
        this.sync();
    }
    sync(){
        var xhr = new XMLHttpRequest();
        xhr.open('PUT','/api/cms?token='+this.props.accessToken);
        xhr.onload = () => {
            this.props.onSave();
            this.setState({editable: true});
        };
        let data = {
            path: this.path,
            block: this.block,
            content: this.state.html,
            language: this.language
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        return xhr;
    }
    render() {
        return React.createElement(
            this.props.tagName || 'div',
            Object.assign({}, {id:this.props.id}, {
                ref: (e) => this.htmlEl = e,
                onBlur: this.handleOnBlur,
                //onDoubleClick: this.handleDoubleClick,
                className: 'active',
                contentEditable: this.state.editable,
                dangerouslySetInnerHTML: {__html: this.props.html}
            }),
            this.props.children);
    }
}