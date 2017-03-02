<?php
namespace Home\Controller;
use Think\Controller;
class BaseController extends Controller {
    public function _initialize(){
        $openid = session('openid');
        if (!$openid) {
            session('openid', 'aaa'); //todo redirect oauth
        }
    }
}