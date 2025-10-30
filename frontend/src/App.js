import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Menu from "./components/Menu";
import HomeScreen from "./components/screens/HomeScreen";
import PrintScreen from "./components/screens/PrintScreen";
import StockScreen from "./components/screens/StockScreen";
import DefaultersScreen from "./components/screens/DefaultersScreen";

function App() {
    return (
        <>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/impresiones" element={<PrintScreen />} />
                    <Route path="/inventario" element={<StockScreen />} />
                    <Route path="/morosos" element={<DefaultersScreen />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
