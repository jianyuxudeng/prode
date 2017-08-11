import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from './jquery';
import {ProDetailHeader} from './comp';
import {todo} from './todo';

export const Login =((props)=>{
	return  class Login extends Component{
		constructor(props){
			super(props);
			this.state={
				username:"",
				pass:"",
				code:0,
				vCode:"../php/com/verification.php",
				err:0,
			};
			this.pass = this.pass.bind(this);
			this.username = this.username.bind(this);
			this.login = this.login.bind(this);
			this.vCode = this.vCode.bind(this);
			this.code = this.code.bind(this);
		}
		username(e){
			this.setState({
				username:e.target.value
			})
		}
		pass(e){
			this.setState({
				pass:e.target.value
			})
		}
		code(e){
			this.setState({
				code:e.target.value
			})
		}
		vCode(){
			this.setState({
				vCode:"../php/com/verification.php?v="+Math.random()
			})
		}
		login(){
			let _this = this;
			if(!this.state.username || !this.state.pass){
				alert("请完整信息！");
				return false;
			}
			if(this.state.err>0 && !this.state.code){
				alert("请完整信息！");
				return false;
			}
			function login(){
				$.ajax({
					type:"post",
					url:"../php/login/login.php",
					async:true,
					data:{username:_this.state.username,password:_this.state.pass,code:_this.state.code},
					success:function(data){
						data = JSON.parse(data);
						if(data.error_code==200){
							_this.props.history.goBack();
							props.dispatch(todo("LOGIN",data.data.username));
						}else{
							_this.setState({
								err:_this.state.err+1
							});
							alert(data.message);
						}
					},error:function(){
						setTimeout(()=>{
							login();
						},1000)
					}
				});
			}
			login();
		}
		render(){
			let info = {rote:this.props,title:"登陆"};
	        let Head = ProDetailHeader(info);
			return(
				<div className="login">
				     <Head />
				     <div className="loginInfo">
				         <div>
				             <input onChange={this.username} type="text" placeholder="请输入用户名"  />
				         </div>
				          <div>
				             <input onChange={this.pass} type="password" placeholder="请输入密码"  />
				         </div>
				         {this.state.err>0?<div className="vcode">
					          <img src={this.state.vCode} onClick={this.vCode} />
					          <input onChange={this.code} type="text" placeholder="请输入验证码" />
					     </div>:""}
				         <div className="loginBtn">
				             <div>
				                  <button onClick={this.login}>登陆</button>
				             </div>
				             <div>
				                  <span>没有账号<Link to="register">注册</Link></span>
				                  <span><Link to="forget">忘记密码</Link></span>
				             </div>
				         </div>
				     </div>
				</div>
			)
		}
	}
})

	

