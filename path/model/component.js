import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from './jquery';

import {Header, Nav} from './comp';


export const Home = ((props)=>{
	return class Ho extends Component{
		render(){
			let Head = Header(props,'home');
			return(
				<div className="home">
				    <Head />
				     {props.getState().prds?props.getState().prds.map(function(item){
				     	return(
				     		<div className="products">
				     		    <Link to= {{pathname:"/proDetail/"+item.id,query:{id:item.id}}} >
					     		    <div className="productsPic">
					     		        <img src={item.pic} />
					     		    </div>
					     		    <div className="productsInfo">
					     		       <div className="bg">
					     		       </div>
					     		        <div className="info">
					     		            <h3>{item.prdName}</h3>
						     		        <p>{item.des}</p>
						     		        <p>
						     		            <span>￥{item.price}</span>
						     		            <span>￥{item.macprice}</span>
						     		        </p>
					     		        </div>
					     		    </div>
					     		 </Link>   
				     		</div>
				     	)
				     }):<div>加载中...</div>}
				     <Nav username={props.getState().username} />
				</div>
			)
		}
	}
})

export const Popup = ((props)=>{
	return class Pop extends Component{
		render(){
			return(
				<div className="popup">
				    <div className="popupInfo">
				        {props.message}
				    </div>
				    <div className="backHome">
				       <button onClick={this.props.history.goBack}>确认</button>
				    </div>
				</div>
			)
		}
	}
}) 