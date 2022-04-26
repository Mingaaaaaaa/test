import React,{Component } from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
export default class Register extends Component {
    
  
  
  register=()=>{

    const name=this.username.value
    const password=this.password.value
   
    let formData = new FormData()
    formData.append("username",name)
    formData.append("password",password)
    formData.append("email",this.email.value)
    formData.append("server_key",'#sdf674%3255$')

    if(name === '' || password === '' ){alert('好像有什么没输入~')}
    else{
        //发送post请求 注册成功给提示
        console.log(name)
        console.log(password)
        console.log(this.email.value)

        axios.post('/register', formData)
        .then(function (response) {
          //注册成功
          console.log(response);
        })
        .catch(function (error) {
          //注册失败了
          console.log(error);
        });
      }

     }
  return=()=>{
         //返回登陆界面
   document.getElementById('login').style.display='block'

     }
    render() {
    return (
     <div id='register'>Register
      <br></br>
      注册用户名<input ref={c=>this.username=c} name="name" />&nbsp;<br></br>
      注册密码&nbsp;&nbsp;<input ref={c=>this.password=c} name="password" type="password"/>
      <br></br>
      注册邮箱<input ref={c=>this.email=c} name="email"/>
      <br></br>
       <button onClick={this.register}>立即注册</button> 
       <button onClick={this.return}>
       <Link to={` `}>返回</Link>
       </button>
       
       <Route path={' '}  /> 

      </div>
    )
  }
}
