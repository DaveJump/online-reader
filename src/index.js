import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main';
import Controller from './components/controller';


function render(dataArr){
	// Render the main component into the dom
	
	ReactDOM.render(<App dataArr={dataArr}/>, document.getElementById('root'));
}

render(Controller.dataArr);

Controller.render = render;

