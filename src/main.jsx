class MathButton extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler() {
        editorMathField.cmd(this.props.com)
    }
    render() {
        return (
                <button onClick={this.clickHandler}>{this.props.val}</button>
        )
    }
}
ReactDOM.render(
    <div>
        <MathButton com={'\\sqrt'} val='RAIZ'/>
        <MathButton com={'\\frac'} val='FRACAO'/>
        <MathButton com={'\\pm'} val='+ -'/>
        <MathButton com={'^'} val={<span>x<sup>y</sup></span>}/>
    </div>,
    document.getElementById('buttons')
)