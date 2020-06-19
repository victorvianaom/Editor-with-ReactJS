class MathButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        editorMathField.cmd(this.props.com);
    }
    render() {
        return React.createElement(
            'button',
            { onClick: this.clickHandler },
            this.props.val
        );
    }
}
ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(MathButton, { com: '\\sqrt', val: 'RAIZ' }),
    React.createElement(MathButton, { com: '\\frac', val: 'FRACAO' }),
    React.createElement(MathButton, { com: '\\pm', val: '+ -' }),
    React.createElement(MathButton, { com: '^', val: React.createElement(
            'span',
            null,
            'x',
            React.createElement(
                'sup',
                null,
                'y'
            )
        ) })
), document.getElementById('buttons'));