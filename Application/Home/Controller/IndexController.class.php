<?php
namespace Home\Controller;
use Org\Util\String;

class IndexController extends BaseController {
    private $appid = 'wx81a4a4b77ec98ff4';
    private $acess_token = 'gh_68f0a1ffc303';
    public function index(){
        $userCurrent = M('user_current_question');
        $openid = session('openid');
        $currentData = $userCurrent->where(array('openid' => $openid))->find();
        $share = '快来参加 “团团打卡 学讲话” 特训，天天打卡，做合格共青团员';
        if ($currentData['date'] == date('Y-m-d', time()) && $currentData['today_group_count'] != 0){
            $users = M('users');
            $user = $users->where(array('openid' => $openid))->find();
            $map['score'] = array('GT', $user['score']);
            $rank = $users->where($map)->count();
            $rank += 1;
            if ($rank <= 50) {
                $real = $users->order('score desc')->field('nickname, imgurl, score')->limit(50)->select();
                foreach ($real as $key => $value) {
                    if ($value['nickname'] == $user['nickname']) {
                        $rank = $key+1;
                    }
                }
            }
            $share = '我正在参加 “团团打卡 学讲话” 特训，打卡第'.$user['days'].'天，排第'.$rank.'名，明天继续！你也加入吧！';
        }
//        $signature = $this->JSSDKSignature();
        $this->assign('signature', $signature);
        $this->assign('appid', $this->appid);
        $this->assign('share', $share);
        $this->display();
    }

    public function questions() {
        $isNew = I('post.new') == 'true' ? true : false;
        $openid = session('openid');
        $questions = M('questions');
        $userCurrent = M('user_current_question');
        $currentData = $userCurrent->where(array('openid' => $openid))->find();
        //访问时检查是否为第二天, 重置状态
        if ($currentData['date'] != date('Y-m-d', time())) {
            $currentData['date'] = date('Y-m-d', time());
            $currentData['time'] = time();
            $currentData['current'] = 0;
            $currentData['today_group_count'] = 0;
            $currentData['today_learn_id'] = json_encode(array());
        }

        //检查学习题目上限
        if ($currentData['today_group_count'] == 5) {
            $this->ajaxReturn(array(
                'status' => 403,
                'error'  => '每天最多只能学五组题'
            ));
        }

        //返回退出时的题目
        if ($currentData['current'] != 0 && !$isNew) {
            $question = $questions->where(array('id' => $currentData['question_id']))->find();
            $this->ajaxReturn(array(
                'status' => 200,
                'data'   => array(
                    'question' => $question,
                    'current'  => $currentData['current']
                )
            ));
        }

        //请求新题目时检查时间是否满足
        if (time() - $currentData['time'] < 10 && $isNew) {
            $this->ajaxReturn(array(
                'status' => 403,
                'error'   => '学习时间未满'
            ));
        }

        $currentData['today_learn_id'] = json_decode($currentData['today_learn_id']);
        if ($currentData['today_learn_id']) {
            $map['id'] = array('NOT IN', $currentData['today_learn_id']);
        }
        if ($currentData['current'] == 0) {
            $map['special_type'] = '2';
            $question = $questions->where($map)->order('rand()')->find();
        } elseif ($currentData['current'] == 1) {
            $map['special_type'] = '1';
            $question = $questions->where($map)->order('rand()')->find();
        } else {
            $question = $questions->where($map)->order('rand()')->find();
        }
        array_push($currentData['today_learn_id'], $question['id']);
        $currentData['today_learn_id'] = json_encode($currentData['today_learn_id']);
        $currentData['current'] += 1;
        $current = $currentData['current'];
        if ($currentData['current'] == 5) {
            $currentData['current'] = 0;
            $currentData['today_group_count'] += 1;
            $users = M('users');
            $user = $users->where(array('openid' => $openid))->find();
            if ($currentData['today_group_count'] == 1) {
                $user['days'] += 1;
            }
            $user['count'] += 1;
            $user['score'] = $user['days']*70 + $user['count']*15;
            $users->where(array('openid' => $openid))->save($user);
        }
        $currentData['time'] = time();
        $currentData['question_id'] = $question['id'];
        $userCurrent->where(array('openid' => $openid))->save($currentData);
        $this->ajaxReturn(array(
            'status' => 200,
            'data'   => array(
                'question' => $question,
                'current'  => $current
            )
        ));
    }

    public function rank() {
        $users = M('users');
        $openid = session('openid');
        $user = $users->where(array('openid' => $openid))->find();
        $map['score'] = array('GT', $user['score']);
        $rank = $users->where($map)->count();
        $rank += 1;
        $list = $users->order('score desc')->field('nickname, imgurl, score')->limit(10)->select();
        if ($rank <= 50) {
            $real = $users->order('score desc')->field('nickname, imgurl, score')->limit(50)->select();
        }
        foreach ($real as $key => $value) {
            if ($value['nickname'] == $user['nickname']) {
                $rank = $key+1;
            }
        }
        if ($user['days'] == 0) {
            $rank = '∞';
        }
        $this->ajaxReturn(array(
            'status' => 200,
            'data'   => array(
                'list' => $list,
                'rank' => $rank,
                'nickname' => $user['nickname'],
                'avatar' => $user['imgurl'],
                'days' => $user['days'],
                'groups' => $user['count']
            )
        ));
    }

    public function moreRank() {
        $from = I('post.from');
        $to = I('post.to');
        if (!is_numeric($from) || !is_numeric($to) || $to < $from) {
            $this->ajaxReturn(array(
                'status' => 403,
                'error'  => '参数错误'
            ));
        }
        $offset = $from - 1 >= 0 ? $from - 1:0;
        $limit = $to - $offset;
        $users = M('users');
        $list = $users->order('score desc')->field('nickname, imgurl, score')->limit($offset, $limit)->select();
        $this->ajaxReturn(array(
            'status' => 200,
            'data'  => $list
        ));
    }

    public function JSSDKSignature(){
        $string = new String();
        $jsapi_ticket =  $this->getTicket();
        $data['jsapi_ticket'] = $jsapi_ticket['data'];
        $data['noncestr'] = $string->randString();
        $data['timestamp'] = time();
        $data['url'] = 'https://'.$_SERVER['HTTP_HOST'].__SELF__;//生成当前页面url
        $data['signature'] = sha1($this->ToUrlParams($data));
        return $data;
    }
    private function ToUrlParams($urlObj){
        $buff = "";
        foreach ($urlObj as $k => $v) {
            if($k != "signature") {
                $buff .= $k . "=" . $v . "&";
            }
        }
        $buff = trim($buff, "&");
        return $buff;
    }


    /*curl通用函数*/
    private function curl_api($url, $data=''){
        // 初始化一个curl对象
        $ch = curl_init();
        curl_setopt ( $ch, CURLOPT_URL, $url );
        curl_setopt ( $ch, CURLOPT_POST, 1 );
        curl_setopt ( $ch, CURLOPT_HEADER, 0 );
        curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
        // 运行curl，获取网页。
        $contents = json_decode(curl_exec($ch), true);
        // 关闭请求
        curl_close($ch);
        return $contents;
    }

    private function getTicket() {
        $time = time();
        $str = 'abcdefghijklnmopqrstwvuxyz1234567890ABCDEFGHIJKLNMOPQRSTWVUXYZ';
        $string='';
        for($i=0;$i<16;$i++){
            $num = mt_rand(0,61);
            $string .= $str[$num];
        }
        $secret =sha1(sha1($time).md5($string)."redrock");
        $t2 = array(
            'timestamp'=>$time,
            'string'=>$string,
            'secret'=>$secret,
            'token'=>$this->acess_token,
        );
        $url = "http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/apiJsTicket";
        return $this->curl_api($url, $t2);
    }
}
