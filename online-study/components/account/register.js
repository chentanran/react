import fetchHelper from '../../kits/fetch.js'
import css from '../../pages/account/login.less'
import { Icon, Row, Col, Form, Input, Button, message } from 'antd'

const FormItem = Form.Item;
// 用户setInterval的对象，将来可以clearInterval
let intervalHander = null
// 倒计时60秒
let timeout = 60

class Register extends React.Component {
  state = {
    bttxt: '获取验证码',  // 获取验证码按钮的文字
    isdisabled: false  // 控制获取验证码按钮是否可用
  }
  // 点击获取验证码按钮后触发的事件
  processsns() {
    intervalHander = setInterval(() => {
      timeout--;
      if (timeout <= 0) {
        clearInterval(intervalHander);
        timeout = 5;
        this.setState({
          snsbttxt: '获取验证码',
          isdisabled: false
        })
      } else {
        this.setState({
          snsbttxt: timeout + '后获取验证码',
          isdisabled: true
        })
      }
    }, 1000);

    // ajax请求获取验证码
    this.getsnscode();
  }
  // ajax请求获取验证码
  getsnscode() {
    // 获取用户在表单中输入的手机号码
    let tel = this.props.form.getFieldValue('user_name');
    //调用接口获取验证码
    fetchHelper.post('/nc/common/account/snscode', { username: tel })
      .then(json => {
        if (json.status == 1) {
          message.error(json.message.reason || json.message);
          return;
        }

        message.success(json.message.reason);
      })
  }
  //   检查手机号码是否注册逻辑
  checkname = () => {
    let tel = this.props.form.getFieldValue('user_name');
    fetchHelper.post('/nc/common/account/checkuser', { username: tel })
      .then(json => {
        if (json.status == 1) {
          message.error(json.message.text || json.message);
          return;
        }
        if (json.message.isRegister) {
          // 自定义错误提示
          this.props.form.setFields({
            // 定义在user_name这个文本框后面显示提示信息
            'user_name': { value: tel, errors: [new Error('用户名已注册')] }
          })
        }
      });
  }
  // 定义检查密码是否一致的逻辑方法
  checkpwd(rule, value, callback) {
    const form = this.props.form;
    if (value && value != form.getFieldValue('password')) {
      callback('两次输入密码不一致');
      return;
    }
    callback();
  }
  // 注册
  register = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.role = 0;
        fetchHelper.post('/nc/common/account/register', values)
          .then(json => {
            if (json.status == 1) {
              message.error(json.message);
              return;
            }

            message.success(json.message.text)
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form ref="register" onSubmit={this.register} className={css.login_form}>
        <FormItem>
          {getFieldDecorator('user_name', {
            rules: [{ required: true, message: '请输入手机号码' },
            { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '用户名必须符合手机格式!' }
            ],
            // validateTrigger:'onBlur'
          })(
            <Row>
              <Col span="14">
                {/* //在onBlur事件中调用checkname */}
                <Input onBlur={this.checkname.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入手机号码" />
              </Col>
              <Col span="1">
                <Button disabled={this.state.isdisabled} type="primary" onClick={this.processsns.bind(this)}>{this.state.bttxt}</Button>
              </Col>
            </Row>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('sns_code', {
            rules: [{ required: true, message: '请输入验证码!' }
            ],
          })(
            <Input prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入验证码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password1', {
            rules: [{ required: true, message: '请再一次输入密码!' },
            { validator: this.checkpwd.bind(this) }],
          })(
            <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
                </Button>
        </FormItem>
      </Form>

    )
  }
}

export default Form.create()(Register)