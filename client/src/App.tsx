import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
	return (
		<Router>
			<>
				<Navbar />
        {/* landing */}
        <section className="container">
        <Routes>
          {/* here goes all the routes */}

        </Routes>
        </section>
			</>
		</Router>
	);
}

export default App;
