import React, {Component} from 'react';
import $ from '../model/jquery';
import {Link} from 'react-router-dom';

let pics = [];

const todo = (type) => ({type:type});

export const AddProds = ((props)=>{
	return class Addpro extends Component{
		constructor(props){
			super(props);
			this.addName = this.addName.bind(this);
			this.addDesc = this.addDesc.bind(this);
			this.addPrice = this.addPrice.bind(this);
			this.addMacPrice = this.addMacPrice.bind(this);
			this.addMoreDes = this.addMoreDes.bind(this);
			this.addSerice = this.addSerice.bind(this);
			this.save = this.save.bind(this);
			this.addCode = this.addCode.bind(this);
			this.addPic = this.addPic.bind(this);
			this.state={
				addName:'',
				addDesc:'',
				addPrice:'',
				addMacPrice:'',
				moreDes:[],
				addSerice:'',
				code:"",
				pic:"",
			}
		}
		addName(e){
			this.setState({addName:e.target.value})
		}
		addDesc(e){
			this.setState({addDesc:e.target.value})
		}
		addPrice(e){
			this.setState({addPrice:e.target.value})
		}
		addMacPrice(e){
			this.setState({addMacPrice:e.target.value})
		}
		addMoreDes(e){
			let imgPath = e.target.value;
			let _this = this;
			let fd = new FormData();
		    fd.append("upload", 1);
		    fd.append("upfile", $("#moreDes").get(0).files[0]);
		    $.ajax({
			      url: "../php/admin/saveMoreDes.php",
			      type: "POST",
			      processData: false,
			      contentType: false,
			      data: fd,
			      success: function(data) {
			      	console.log(data)
			      	data = JSON.parse(data);
			      	if(data.error_code==200){
			      		pics.push(data.src);
			      		_this.setState({moreDes:pics})
			      	}
			      }
		    });
		}
		addPic(e){
			let _this = this;
			let fd = new FormData();
		    fd.append("upload", 1);
		    fd.append("upfile", $("#prdPic").get(0).files[0]);
		    $.ajax({
			      url: "../php/admin/saveMoreDes.php",
			      type: "POST",
			      processData: false,
			      contentType: false,
			      data: fd,
			      success: function(data) {
			      	data = JSON.parse(data);
			      	if(data.error_code==200){
			      		_this.setState({pic:data.src})
			      	}
			      }
		    });
		}
		addSerice(e){
			this.setState({addSerice:e.target.value})
		}
		addCode(e){
			this.setState({code:e.target.value})
		}
		save(){
			let name = this.state.addName;
			let des = this.state.addDesc;
			let price = this.state.addPrice;
			let mordes="";
			let code = this.state.code;
			let pic = this.state.pic;
			for(let i in this.state.moreDes){
				if(mordes!=""){
					mordes = mordes+","+ this.state.moreDes[i]
				}else{
					mordes =  this.state.moreDes[i]
				}
				
			}
			let macprice = this.state.addMacPrice;
			let serice = this.state.addSerice;
			if(!name || !des || !price || !macprice || !mordes || !serice || !code || !pic){
				alert("请填写完整信息")
			}else{
				$.ajax({
				      url: "../php/admin/savePrdsInfo.php",
				      type: "POST",
				      data: {prdName:name,des:des,price:price,macprice:macprice,serice:serice,mordes:mordes,code:code,pic:pic},
				      success: function(data) {
				      		console.log(data)
				      	data = JSON.parse(data);
				      	if(data.error_code==200){
				      		props.dispatch(todo('ADD_SEUCESS'));
				      		window.location.href = '#/popup';
				      	}
				      }
			    });
			}
			
		}
		render(){
			return(
				<div className="addProds">
				    <div> 
				         <span>产品编号:</span>
				         <input type="text"  onChange={this.addCode.bind(this)} />
				     </div>
				     <div> 
				         <span>产品名称:</span>
				         <input type="text"  onChange={this.addName.bind(this)} />
				     </div> 
				     <div>
				         <span>产品描述:</span>
				         <textarea onChange={this.addDesc.bind(this)} ></textarea>
				     </div>  
				     <div>
				         <span>产品图片:</span>
				         <input type="file" id="prdPic"  onChange={this.addPic.bind(this)} />
				     </div>
				     {this.state.pic!=""?<div>
				         <img src={this.state.pic} />
				     </div>:""}
				     <div>    
				         <span>价格:</span>
				         <input type="text"  onChange={this.addPrice.bind(this)} />
				    </div>  
				     <div>     
				         <span>市场价格:</span>
				         <input type="text"  onChange={this.addMacPrice.bind(this)} />
				    </div>  
				     <div>     
				         <span>产品详情:</span>
				         <input type="file" id="moreDes"  onChange={this.addMoreDes.bind(this)} />
				    </div>
				    <div className="showDetail">
				         {this.state.moreDes.map(function(item){
				         	return <img src={item} />
				         })}
				    </div>
				     <div>     
				         <span>产品系列:</span>
				         <select onChange={this.addSerice.bind(this)}>
				              <option value="0">请选择</option>
				              <option value="食品">食品</option>
				              <option value="数码">数码</option>
				              <option value="教育">教育</option>
				         </select>
				     </div> 
				     <div className="savePrd">
				         <button onClick={this.save}>保存</button>
				     </div>
				</div>
			)
		}
	}
})


export class Home extends Component{
	render(){
		return(
			<div className="home">
			     welcome admin
			</div>
		)
	}
}


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