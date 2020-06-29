class MathBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: {
                margin: "auto",
                padding: 5
            }
        }
    }
    render() {
        return <textarea id="textarea-math-box" style={this.state.style}> </textarea>
    }
}
ReactDOM.render(
    <MathBox />,
    document.getElementById('div-editor')
)

class MathButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        var mathElement = document.getElementById('textarea-math-box')
        var mathField = MQ.MathField(mathElement)
        this.state = {
            activeMathField: mathField /// CHANGE mathFild as the math-box being focused change
        }
    }
    handleClick() {
        this.state.activeMathField.cmd(this.props.latex)
    }
    render() {
        return (
            <button onClick={this.handleClick}>{this.props.val}</button>
        )
    }
}
ReactDOM.render(
    <div>
        <MathButton latex={'\\sqrt'} val='RAIZ'/>
        <MathButton latex={'\\frac'} val='FRACAO'/>
        <MathButton latex={'\\pm'} val='+ -'/>
        <MathButton latex={'^'} val={<span>x<sup>y</sup></span>}/>
    </div>,
    document.getElementById('buttons')
)
