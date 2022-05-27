import "./error.component.css";

function Error(props) {
    return (
        <div id="errorDiv">
            {props.errorMessage}
        </div>
    );
}
export default Error;