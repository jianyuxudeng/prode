import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from './jquery';
import {Ucen} from './noLogin';

export const Menu = (props) => (
	<div >
	   <ul onClick={props.menuHide}>
	       <li><Link to="/home">首页</Link></li>
	       <li><Link to="/proList/食品">食品</Link></li>
	       <li><Link to="/proList/教育">教育</Link></li>
	       <li><Link to="/proList/数码">数码</Link></li>
	       <li><Ucen username={props.username} /></li>
	       <li>{!props.username?<Link to="login">登录</Link>:<div onClick={props.layout}>退出</div>}</li>
	    </ul>
	</div>
)


export const UcMenu = (props) => (
	<div>
	   <ul onClick={props.menuHide}>
	       <li><Link to="/home">首页</Link></li>
	       <li><Link to="/ucenter">个人中心</Link></li>
	       <li><Link to="/ucenter/order">订单列表</Link></li>
	       <li>{!props.username?<Link to="/login">登录</Link>:<div onClick={props.layout}>退出</div>}</li>
	   </ul>
	</div>
)
