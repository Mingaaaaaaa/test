import React, { Component } from 'react'
import Register  from './pages/Register/Register'
import {Link, Route ,withRouter} from 'react-router-dom'
import axios from 'axios'
import Message from './pages/Message/Message'
 
class App extends Component {
    state={access_token:''}
  login=()=>{
    //发送登录请求
    const name=this.username.value
    const password=this.password.value
    const push=this.props.history.push
   
    if(name === '' || password === '' ){alert('好像有什么没输入~')}
    else{
          var app=this
          let formData = new FormData()
          formData.append("username",name)
          formData.append("password",password)

          axios.post('/login',formData)
              .then(function (response) {
                console.log(response);
                //登录成功后执行展示留言板界面
                console.log('登陆成功咯，跳转留言展示界面')
                document.getElementById('login').style.display='none'
                app.setState({access_token:response.data.access_token})
                console.log(response.data.access_token)
                push(`/message/${name}/${response.data.access_token}`)
              })
              .catch(function (error) {
                //登陆失败时
                console.log('登陆失败了')
                alert('啊哦，账号密码有误！')
              });
                
              console.log(this.username.value)
              console.log(this.password.value)
      }}

 
   register=()=>{
      console.log('跳到注册页')
      document.getElementById('login').style.display='none'
}

  render() {
        
        return (
          <div>
          <div id='login'>
           Welcome
           <br></br>
            输用户名<input ref={c=>this.username=c} name="name" /><br></br>
            输入密码<input ref={c=>this.password=c} name="password" type="password"/> <br></br> &nbsp;&nbsp;
            <button onClick={this.login}>登录</button>         &nbsp;&nbsp;
            <button onClick={this.register}>
            <Link to={`/register`}>注册</Link>
            </button>

          </div>
          <Route path={'/register'}  component={Register} /> 
          <Route path={'/message/:name/:access_token'} component={Message}/ > 

          </div>
        )
      }
    }
export default withRouter(App)
