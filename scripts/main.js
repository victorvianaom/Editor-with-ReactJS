class MathButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        editorMathField.cmd(this.props.latex);
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
    React.createElement(MathButton, { latex: '\\sqrt', val: 'RAIZ' }),
    React.createElement(MathButton, { latex: '\\frac', val: 'FRACAO' }),
    React.createElement(MathButton, { latex: '\\pm', val: '+ -' }),
    React.createElement(MathButton, { latex: '^', val: React.createElement(
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