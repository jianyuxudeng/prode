import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import $ from './jquery';

import {ProDetailHeader, Nav} from './comp';


export const ProList = ((props)=>{
	return class ProLi extends Component{
		constructor(props){
			super(props);
			this.state={
				list:[],
				serise:"",
			}
		}
		componentDidMount(){
			let _this = this;
			let {query} = this.props.location;
//			let serise = query && query.serise ? query.serise:"";
			let serise = this.props.match.params.serise;
			this.setState({
				serise:serise
			});
			function getProList(){
				$.ajax({
					type:"get",
					url:"../php/products/getProList.php",
					data:{serise:serise},
					async:true,
					success:function(data){
						data = JSON.parse(data);
						if(data.error_code==200){
							_this.setState({list:data.data});
						}
					},error:function(){
						setTimeout(()=>{
							getProList()
						},1000)
					}
				});
			}
			getProList();
		}
		render(){
			let info = {rote:this.props,title:"产品列表"};
			let Head = ProDetailHeader(info);
			return(
				<div className="home">
				  
				    <Head />
				     {this.state.list?this.state.list.map(function(item){
				     	return(
				     		<div className="products">
				     		    <Link to= {{pathname:"/proDetail",query:{id:item.id}}} >
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
				</div>
			)
		}
	}
})