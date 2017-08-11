import './admin.css';
import '../com';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter as Router, Route, Link,Switch} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Home,AddProds, CssAni, Popup} from './component';
import {createStore} from 'redux';
import {Provider, connect } from 'react-redux';

const todo = (type) => ({type:type});

const reducer = (state={message:""},action) => {
	switch(action.type){
		case "ADD_SEUCESS":
		    return Object.assign({},state,{
		    	    message:"添加成功"
		    });
		default: return state;    
	}
}

const store = createStore(reducer);


class Global extends Component{
	render(){
		return(
			<Router>
			    <div>			        
				    <Route render={({ location }) => (
				    	    <div>
					    	    <ul className="footer">
						        <li><Link to="home">home</Link></li>
						        <li><Link to="addProds">addProds</Link></li>
						    </ul>
					    	    <ReactCSSTransitionGroup
							    transitionName="fade"
							    transitionEnterTimeout={500}  
							    transitionLeaveTimeout={500}
							>
					         <Switch className="routCont" location={location} key={location.pathname}>
					             <Route path="/home" component={Home}  />
					             <Route path="/addProds" component={AddProds(store)} />
					             <Route path="/popup" component={Popup(store.getState())} />
					         </Switch>
					         </ReactCSSTransitionGroup>
				         </div>
				    )}/>
			    </div>
			</Router>
		)
	}
}

const run = () =>(
	render(
		<Global />,
		document.getElementById("global")
	)
)

run();

store.subscribe(run);