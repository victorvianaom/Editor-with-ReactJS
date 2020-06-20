class MathButton extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler() {
        editorMathField.cmd(this.props.latex)
    }
    render() {
        return (
                <button onClick={this.clickHandler}>{this.props.val}</button>
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