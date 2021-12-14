import "./App.scss";
import PlatformRoutes from "./Routes/Routes";

import { Provider } from "react-redux";
import { Store } from "./Store";
function App() {
	return (
		<Provider store={Store}>
			<PlatformRoutes />;
		</Provider>
	);
}

export default App;
