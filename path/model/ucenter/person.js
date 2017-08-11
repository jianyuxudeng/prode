import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export const Person = ((props)=>{
	return class Per extends Component{
		constructor(props){
			super(props);
			this.state={
				head:"",
			};
			this.headError = this.headError.bind(this);
		}
		headError(){
			this.setState({
				head:"/img/ucenter/onitHeader.png",
			});
		}
		render(){
			return(
				<div className="person">
				    <div className="head">
				         <img src={this.state.head} onError={this.headError} />
				    </div>
				     <div className="personDiv">
				        <span>用户名:</span><span>{props.getState().username}</span>
				     </div>
				      <div className="personDiv">
				         <span>邮&emsp;箱:</span><span>{props.getState().username}</span>
				      </div>
				     <div className="personDiv">
				         <span>手&emsp;机:</span><span>{props.getState().username}</span>
				      </div>
				     <div className="personDiv">
				         <span>签&emsp;名:</span><span>{props.getState().username}</span>
				      </div>
				      <div className="personDiv btnBlue">
			              <button>修改</button>
			          </div>
				</div>
			)
		}
	}
})
