import React, {Component} from 'react';


export class EditUser extends Component{
	render(){
		return(
			<div className="editUser">
			    <div>
			          <input type="text" placeholder="请输入邮箱" />
			     </div>
			     <div>
			          <input type="text" placeholder="请输入手机" />
			     </div>
			     <div>
			          <input type="text" placeholder="请输入签名" />
			     </div>
			     <div>
			         <button>保存</button>
			     </div>
			</div>
		)
	}
}
