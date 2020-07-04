class MathBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                margin: "auto",
                padding: 5
            }
        };
    }
    render() {
        return React.createElement(
            "div",
            { id: "div-math-box", style: this.state.style },
            " "
        );
    }
}
ReactDOM.render(React.createElement(MathBox, null), document.getElementById('div-editor'));

class MathButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        var mathElement = document.getElementById('div-math-box');
        var mathField = MQ.MathField(mathElement);
        this.state = {
            activeMathField: mathField /// CHANGE mathFild as the math-box being focused change
        };
    }
    handleClick() {
        this.state.activeMathField.cmd(this.props.latex);
    }
    render() {
        return React.createElement(
            "button",
            { onClick: this.handleClick },
            this.props.val
        );
    }
}
ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(MathButton, { latex: '\\sqrt', val: "RAIZ" }),
    React.createElement(MathButton, { latex: '\\frac', val: "FRACAO" }),
    React.createElement(MathButton, { latex: '\\pm', val: "+ -" }),
    React.createElement(MathButton, { latex: '^', val: React.createElement(
            "span",
            null,
            "x",
            React.createElement(
                "sup",
                null,
                "y"
            )
        ) })
), document.getElementById('buttons'));