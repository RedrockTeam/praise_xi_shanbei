<?php
namespace Home\Controller;

class IndexController extends BaseController {
    public function index(){
        echo '123';
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
        if ($currentData['today_group_count'] == 3) {
            $this->ajaxReturn(array(
                'status' => 403,
                'error'  => '每天最多只能学三组题'
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
        if (time() - $currentData['time'] < 15 && $isNew) {
            $this->ajaxReturn(array(
                'status' => 403,
                'error'   => '学习时间未满'
            ));
        }

        $currentData['today_learn_id'] = json_decode($currentData['today_learn_id']);
        if ($currentData['today_learn_id']) {
            $map['id'] = array('NOT IN', $currentData['today_learn_id']);
        }
        $question = $questions->where($map)->order('rand()')->find();
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
            $user['score'] = $user['days']*70 + $user['count']*10;
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
        $list = $users->order('score desc')->field('nickname, score')->limit(10)->select();
        $this->ajaxReturn(array(
            'status' => 200,
            'data'   => array(
                'list' => $list,
                'rank' => $rank,
                'nickname' => $user['nickname'],
                'days' => $user['days'],
                'groups' => $user['count']
            )
        ));
    }
}