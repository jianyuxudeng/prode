import './index.css';
import './com';
import $ from './model/jquery';

import {Home,Popup} from './model/component';
import {Prodetail} from './model/prodetail';
import {Ucenter} from './model/ucenter';
import {todo} from './model/todo';
import {ProList} from './model/proList';
import {Login} from './model/login';
import {Register} from './model/register';
import {Forget} from './model/forget';


import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import {createStore} from 'redux';


const reducer = (state={prds:""}, action) => {
	switch(action.type){
		case "GET_PRDS":
		     return Object.assign({},state,{
		     	prds:action.text
		     });
		case "LOGIN":
		    return Object.assign({},state,{
		    	    username:action.text
		    })
		case "LAYOUT":
		   return Object.assign({},state,{
		    	    username:action.text
		    })
		default:return state;
	}
}



const store = createStore(reducer);

function getUserName(){
	$.ajax({
		type:"post",
		url:"../php/login/login.php",
		async:true,
		success:function(data){
			data = JSON.parse(data);
			if(data.error_code==200){
				store.dispatch(todo("LOGIN",data.data.username));
			};
			run();
			store.subscribe(run);
		},error:function(){
			setTimeout(()=>{
				getUserName()
			},1000)
		}
	});
}

getUserName();

function getPrdList(){
	$.ajax({
		type:"get",
		url:"../php/products/getPrdList.php",
		async:true,
		success:function(data){
			data = JSON.parse(data);
			if(data.error_code=200){
				store.dispatch(todo("GET_PRDS",data.data));
			}
		},error:function(data){
			setTimeout(()=>{
				getPrdList()
			},1000)
		}
	});
}

getPrdList();

//<BrowserRouter basename="/" forceRefresh={false} />
class Global extends Component{
	render(){
		return(
			<Router basename="/" forceRefresh={false}>
			    <div>
			         <Route render={({location})=>(
			         	<div>
			         	    <Route exact path="/" render={() => (
					           <Redirect to="/home"/>
					        )}/>
					    	    <CSSTransitionGroup
							    transitionName="fade"
							    transitionEnterTimeout={500}  
							    transitionLeaveTimeout={500}
							>
						         <Switch className="routCont" location={location} key={location.pathname}>
						             <Route path="/home" component={Home(store)}  />
						             <Route path="/proDetail/:id" component={Prodetail(store)}  />
						             <Route path="/ucenter" component={Ucenter(store)}  />
						             <Route path="/proList/:serise" component={ProList(store)}  />
						             <Route path="/popup" component={Popup(store.getState())} />
						             <Route path="/login" component={Login(store)}  />
						             <Route path="/register" component={Register(store)}  />
						             <Route path="/forget" component={Forget}  /> 
					             </Switch>
					         </CSSTransitionGroup>
			         	</div>
			         )} />
			    </div>
			</Router>
		)
	}
}

const run = () => (
	render(
		<Global />,
		document.getElementById("global")
	)
)