import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import $ from './jquery';
import {ProDetailHeader} from './comp';
import {todo} from './todo';

export const Register = ((props)=>{
	return class Register extends Component{
		constructor(props){
			super(props);
			this.state={
				username:"",
				password:"",
				rePassword:"",
				code:"",
				vCode:"../php/com/verification.php",
			}
			this.vCode = this.vCode.bind(this);
			this.register = this.register.bind(this);
			this.username = this.username.bind(this);
			this.password = this.password.bind(this);
			this.rePassword = this.rePassword.bind(this);
			this.code = this.code.bind(this);
		}
		conponentDidMount(){
			
		}
		vCode(){
			this.setState({
				vCode:"../php/com/verification.php?v="+Math.random()
			})
		}
		username(e){
			this.setState({
				username:e.target.value
			})
		}
		password(e){
			this.setState({
				password:e.target.value
			})
		}
		rePassword(e){
			this.setState({
				rePassword:e.target.value
			})
		}
		code(e){
			this.setState({
				code:e.target.value
			})
		}
		register(){
			let _this = this;
			if(!this.state.username || !this.state.password || !this.state.code){
				alert("请完整信息！");
				return false;
			}else if(this.state.password!==this.state.rePassword){
				alert("两次密码不一致！");
				return false;
			}
			function register(){
				$.ajax({
					type:"post",
					url:"../php/login/register.php",
					async:true,
					data:{
						username:_this.state.username,
						password:_this.state.password,
						rePassword:_this.state.rePassword,
						code:_this.state.code
					},
					success:function(data){
						data = JSON.parse(data);
						if(data.error_code==200){
							props.dispatch(todo("LOGIN",data.data.username));
						}else{
							alert(data.message);
						}
					},error:function(){
						setTimeout(()=>{register()},1000)
					}
				});
			}
			register();
		}
		render(){
		    let info = {rote:this.props,title:"注册"};
	        let Head = ProDetailHeader(info);
			return(
				<div className="register">
				     {props.getState().username?<Redirect to="/home" />:""}
				     <Head />
				     <div className="registerInfo">
					      <div>
					          <input onChange={this.username} type="text" placeholder="请输入用户名" />
					     </div>
					     <div>
					          <input onChange={this.password} type="password" placeholder="请输入密码" />
					     </div>
					     <div>
					          <input onChange={this.rePassword} type="password" placeholder="请确认密码" />
					     </div>
					     <div className="vcode">
					          <img src={this.state.vCode} onClick={this.vCode} />
					          <input onChange={this.code} type="text" placeholder="请输入验证码" />
					     </div>
					     <div>
					         <button onClick={this.register}>确认</button>
					     </div>
				     </div>
				</div>
			)
		}
	}

})
