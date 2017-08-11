<?php
     class Auth{
     	private $appId = 'wxbf52b89ac6da63b0';
		private $appSecret = 'c3b6d4d5e911cf7bdaa43a914fe6ea0b';
		public function __construct($appId, $appSecret) {
			$this -> appId = $appId;
			$this -> appSecret = $appSecret;
		}
		
		private function getAuth(){
			$url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=$this->appId&redirect_uri=http://hyu2890930001.my3w.com/index.html&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
		}
     }
?>