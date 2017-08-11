import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from './jquery';
import {ProDetailHeader} from './comp';
import {createStore} from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {todo} from './todo';

const reducer = (state={info:""},action) => {
	switch(action.type){
		case "ADD_CART":
		    return Object.assign({},state,{
		    	    info:action.text,
		    })
		default:return state;
	}
}

const store = createStore(reducer);


class Nav extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
	}
	render(){
		return(
			<ul className="footer">
			    <li onClick={this.props.addSmCart}>加入购物车</li>
			    <li onClick={this.props.addSmCart}>立即购买</li>
			</ul>
		)
	}
}

const SmCart = (props) => (
	<ReactCSSTransitionGroup
	    transitionName="bottomin"
	    transitionEnterTimeout={600}  
	    transitionLeaveTimeout={600}
	>
		{props.show?<div className="smCart proDetailText" key="smCart">
		   <div className="smCartBg" onClick={props.closeSmCart}></div>
		   <div className="smCartInfo">
			    <p>
		             <button onClick={props.reduce}>-</button>
		             <input type="number" onChange={props.setNum.bind(this)} value={props.num} />
		             <button onClick={props.add}>+</button>
		         </p>
		         <div>
		            价格:{parseFloat(props.value.info.price*props.num).toFixed(2)}
		         </div>
		         <div className="addCart">
		              <button>立即购买</button>
		         </div>
		   </div>
		</div>:""}
	</ReactCSSTransitionGroup>
)

export const Prodetail = ((props)=>{
	return class Pro extends Component{
		constructor(props){
			super(props);
			this.state={
				product:"",
				num:1,
				show:false,
			};
			this.reduce = this.reduce.bind(this);
			this.add = this.add.bind(this);
			this.setNum = this.setNum.bind(this);
			this.addSmCart = this.addSmCart.bind(this);
			this.closeSmCart = this.closeSmCart.bind(this);
		}
		reduce(){
			let num = this.state.num>1?this.state.num-1:this.state.num;
			this.setState({num:num});
		}
		add(){
			this.setState({num:this.state.num+1});
		}
		setNum(e){
			this.setState({num:e.target.value})
		}
		addSmCart(){
			this.setState({show:true});
		     store.dispatch(todo("ADD_CART",this.state.product));
	    }
		closeSmCart(){
			this.setState({show:false});
			store.dispatch(todo("CLOSE_CART"));
		}
		componentDidMount(){
			let _this = this;
			let id = this.props.match.params.id;
			function getProDetail(){
				$.ajax({
					type:"POST",
					url:"../php/products/getPrdDetail.php",
					data:{id:id},
					async:true,
					success:function(data){
						data = JSON.parse(data);
						if(data.error_code=200){
							_this.setState({
								product:data.data
							})
						}
					},error:function(data){
						setTimeout(()=>{
							getProDetail()
						},1000)
					}
				});
			}
			getProDetail();
		}
		render(){
			let product = this.state.product;
			let prodes = product?product.mordes:"";
			prodes = prodes!=""?prodes.split(","):[];
			let info = {rote:this.props,title:"产品详情"};
			let ProDetailHead = ProDetailHeader(info);
			return(
				<div className="proDatail">
				    <ProDetailHead />
					{product!=""?<div>
					    <div className="proDetaiInfo">
					         <div className="proDetailPic">
					            <img src={product.pic} />
					         </div>
					         <div className="proDetailText">
					             <h3>{product.prdName}</h3>
					             <p>{product.des}</p>
					             <p>
					                 <span>￥{product.price}</span>
						     		<span>￥{product.macprice}</span>
					             </p>
					         </div>
					         <div className="proDetailTitle">
					            产品描述
					         </div>
					         <div className="proDetailDes">
					             {prodes.map(function(item){
					             	return <img src={item} />
					             })}
					         </div>
					    </div>
					</div>:""}
					<Nav info={product} addSmCart={this.addSmCart} />
					<SmCart closeSmCart={this.closeSmCart} value={store.getState()} reduce={this.reduce} add={this.add} setNum={this.setNum.bind(this)}  num={this.state.num} show={this.state.show} />
				</div>
			)
		}
	}
})

