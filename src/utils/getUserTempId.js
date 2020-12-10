import { v4 as uuidv4 } from 'uuid'

//创建未登录用户的临时使用id
// 先读取本地的localstorage看看是否有usertempid
// 如果有则直接使用
// 如果没有则会创建id并保存在localstorage中

function getUserTempId () {
  //读取缓存中的临时id 
  let userTempId = localStorage.getItem("userTempId");
  //如果有则直接用
  if (userTempId) {
    return userTempId
  }
  //通过uuid创建用户临时id
  userTempId = uuidv4()
  //存入缓存中
  localStorage.setItem("userTempId", userTempId)
}

export default getUserTempId