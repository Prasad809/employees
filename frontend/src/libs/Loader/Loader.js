// function Loader() {
//     return (
//         <div className="app-loader">
//             <div className="spinner"></div>
//         </div>
//     );
// }

// export default Loader;
import "./loader.css"
function Loader() {
    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
}

export default Loader;
