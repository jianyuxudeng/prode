import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export const Ucen = (props) => (
	<div>
	    {props.username?<Link to={{pathname:"/ucenter",query:{username:"username"}}}>
	         个人中心
	     </Link>:<Link to="/login">
	         个人中心
	     </Link>}
	</div>
)