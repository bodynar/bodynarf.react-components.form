import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bulma/bulma.sass";
import "bulma-checkradio/dist/css/bulma-checkradio.sass";


// #region simulate root redux
import { legacy_createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const store = legacy_createStore(
    combineReducers({
		default: function() {
			return {};
		},
	})
);

// #endregion

ReactDOM
	.createRoot(
		document.getElementById("root") as HTMLElement
	)
	.render(
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>,
	);
