import React, {Component} from 'react';
import {Link,Route, Redirect} from 'react-router-dom';
import $ from './jquery';

import {Header, Nav} from './comp';
import {Person} from './ucenter/person'
import {OrderList} from './ucenter/orderList'



export const Ucenter = ((props)=>{
	return class Ucen extends Component{
		render(){
			let Head = Header(props,'ucenter');
			return(
				<div className="ucenter">
				    {!props.getState().username?<Redirect push to="/login" />:""}
				    <Head />
				    <Route exact path={`${this.props.match.url}`} component={Person(props)} />
				    <Route path={`${this.props.match.url}/:order`} component={OrderList(props)} />
				    <Nav username={props.getState().username} />
				</div>    
			)
		}
	}
})
