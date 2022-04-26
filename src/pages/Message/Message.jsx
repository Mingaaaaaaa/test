import React, { Component } from 'react'
import axios from 'axios'
export default class Message extends Component {
   state={
     messages:[]
   }

    //组件渲染后发请求获取所有留言
    componentDidMount(){
   document.getElementById('login').style.display='none'

      var Mes=this
      axios.post('/message/all', {serverKey:'%23sdf674%3255$'})
      .then(function (response){
          //成功后执行展示留言板界面
          console.log('请求留言咯')
          console.log(response);
          //把留言数据放到数据中
           Mes.setState({messages:response.data.data})
      })
      .catch(function (error) {
        //获取留言失败时
        console.log('获取留言失败了~')
        alert('获取留言失败了~')
      });
  }
  
  //用户留言，发送请求函数
  send=(access_token)=>{
    return()=>{
      var mes=this.message.value
      let formData = new FormData()
          formData.append("access_token",access_token)
          formData.append("message",mes)
          formData.append("server_key",'#sdf674%3255$')
      
      axios.post('/message/send', formData)
        .then(function (response) {
          console.log( response);
        })
        .catch(function (error) {
          console.log(error);
          console.log("留言失败了~");
        });
        mes= ''
    }
        
}
    render() {
    //获取登录界面传过来 的name 和access_token
    const {name,access_token}=this.props.match.params
    const {messages}=this.state
    
    return (
      <div>
     <h1> MessageBoard<br></br>留言板</h1>
      <h2>Hi,{name}</h2>
      <div>
           <input ref={c=>this.message=c} placeholder='在这里输入想留下的话吧'></input>
           <button onClick={this.send(access_token)}>发表</button>

           <div>
            <h3>用户留言的信息</h3> 
            {  
              messages.map( item => {
                    return(
                      <div>
                      <h4>来自{item.id}的留言:</h4>
                       <p>{item.message}</p>
                       </div>
                          )       
                            }) 

            }    
            </div>

      </div>
  
      </div>
    )
  }
}
