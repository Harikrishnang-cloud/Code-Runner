import EditorPage from "./pages/EditorPage"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return(
    <>
    <EditorPage/>
    <ToastContainer position="bottom-right"autoClose={8000} hideProgressBar={false} pauseOnHover/>
    </>
  )
}

export default App;
