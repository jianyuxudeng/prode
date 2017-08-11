import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import $ from './jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {todo} from './todo';
import {Menu, UcMenu} from './menu';

import {Ucen} from './noLogin';


export const Nav = (props) => (
	<ul className="footer">
        <li><Link to="/home">首页</Link></li>
        <li><Ucen username={props.username} /></li>
    </ul>
)


export const Header = ((props,page) => {
	return class Head extends Component{
		constructor(props){
			super(props);
			this.state={
				menu:"hide",
			};
			this.menuShow = this.menuShow.bind(this);
			this.menuHide = this.menuHide.bind(this);
			this.layout = this.layout.bind(this);
		}
		menuShow(){
			let show = this.state.menu=="show"?"hide":"show";
			this.setState({menu:show});
		}
		menuHide(){
			this.setState({menu:"hide"})
		}
		layout(){
			function layout(){
				$.ajax({
					type:"get",
					url:"../php/login/layout.php",
					async:true,
					success:function(){
						props.dispatch(todo("LAYOUT"));
					},error:function(){
						setTimeout(()=>{
							layout()
						},1000)
					}
				});
			};
			layout();
		}
		render(){
			let  data = props.getState();
			return(
				<div className="header">
				    <div className="headerNav">
				        <div className="menu" onClick={this.menuShow}>
					      三
					    </div>
					    <div className="searchBox" onClick={this.menuHide}>
					       <input type="search" />
					    </div>
					    <div className="message" onClick={this.menuHide}>
					        iss
					    </div>
				    </div>
				     <ReactCSSTransitionGroup
					    transitionName="topin"
					    transitionEnterTimeout={300}  
					    transitionLeaveTimeout={300}
					>
				       {this.state.menu=="show"?<div key="menu" className="menuList">
				            {page=="home"?<Menu username={data.username} menuHide={this.menuHide} layout={this.layout} />:""}
				             {page=="ucenter"?<UcMenu username={data.username} menuHide={this.menuHide} layout={this.layout} />:""}
				       </div>:""}
				    </ReactCSSTransitionGroup>
				</div>
			)
		}
	}
})


export const ProDetailHeader = ((props) => {
	return class ProDetailHead extends Component{
		render(){
			return(
				<div className="header">
				    <div className="menu" onClick={props.rote.history.goBack}>
				          返回
				    </div>
				    <div className="searchBox">
				       {props.title}
				    </div>
				    <div className="message" >
				        客服
				    </div>
				</div>
			)
		}
	}
})