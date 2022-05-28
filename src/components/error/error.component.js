import "./error.component.css";

function Error(props) {
    return (
        <div id="errorDiv" style={{backgroundColor: props.bgColor}}>
            {props.errorMessage}
        </div>
    );
}
export default Error;