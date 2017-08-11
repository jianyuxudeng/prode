import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from './jquery';
import {ProDetailHeader} from './comp';

export class Forget extends Component{
	render(){
	    let info = {rote:this.props,title:"忘记密码"};
        let Head = ProDetailHeader(info);
		return(
			<div className="register">
			     <Head />
			     <div className="registerInfo">
				      <div>
				          <input type="password" placeholder="请输入原密码" />
				     </div>
				     <div>
				          <input type="password" placeholder="请输入修改密码" />
				     </div>
				     <div>
				          <input type="password" placeholder="请确认修改密码" />
				     </div>
				     <div>
				          <input type="text" placeholder="请输入验证码" />
				     </div>
				     <div>
				         <button>确认</button>
				     </div>
			     </div>
			</div>
		)
	}
}