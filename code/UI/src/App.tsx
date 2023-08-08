import Home from "@/pages/Home";
import Policy from "@/pages/Policy"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Claims from "./pages/Claims";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/Home" element={<Home/>}></Route>
                <Route path="/Policy" element={<Policy/>}></Route>
                <Route path="/Claims" element={<Claims/>}></Route>
                <Route path="/Dashboard" element={<Dashboard/>}></Route>
                <Route path="/*" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;