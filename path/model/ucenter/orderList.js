import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export const OrderList = ((props)=>{
	return class OrderList extends Component{
		render(){
			return(
				<div className="orderList">
				     <div className="orderListDiv">
				         <span>订单编号</span>
				         <span>产品图片</span>
				         <span>产品名称</span>
				         <span>产品单价</span>
				         <span>订单总价</span>
				         <span>订单状态</span>
				         <span><button>付款</button></span>
				     </div>
				</div>
			)
		}
	}
})