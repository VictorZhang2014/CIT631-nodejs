const express = require('express'); 
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const { 
  initSQLFc, 
  addUserFc, 
  userExistsFc, 
  userExistsFc1,
  updateUserPasswordFc,
  queryAllUserFc,
  deleteUserFc,
} = require('./db_helper');
const { 
  CODE_SUCCESS,
  CODE_EMAIL_EXISTS,
  CODE_EMAIL_NOT_EXISTS,
  CODE_EMAIL_PASSWORD_ERR,
  CODE_REGISTRATION_ERR,
  CODE_PASSWORD_RESET_FAILURE,
  CITResponse 
} = require('./models');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const app = express();
app.use(cors()); // 配置 CORS 允许任意来源
app.use(express.json()); 

// initSQLFc();

app.get('/', function (req, res) {
  res.status(200).send('API Services for CIT 631/1');
});

// 账户登录
app.get('/api/login', urlencodedParser, async (req, res) => {
  var respDict = {};
  let userId = await userExistsFc(req.query.email, req.query.password)
  if (userId > 0) {
    respDict = CITResponse(CODE_SUCCESS, "登录成功", {"userId": userId});
  } else {
    respDict = CITResponse(CODE_EMAIL_PASSWORD_ERR, "邮箱或密码错误", "");
  }
  res.status(200).send(respDict);
});

// 账户注册
app.post('/api/register', urlencodedParser, async (req, res) => {
  var respDict = {};
  let userId = await userExistsFc(req.body.email, req.body.password); 
  if (userId > 0) {
    respDict = CITResponse(CODE_EMAIL_EXISTS, "邮箱已存在", "");
  } else {
    if (await addUserFc(req.body.email, req.body.password)) {
      respDict = CITResponse(CODE_SUCCESS, "注册成功", "");
    } else {
      respDict = CITResponse(CODE_REGISTRATION_ERR, "注册失败", "");
    }
  }
  res.status(200).send(respDict);
});

// 密码重置
app.post('/api/passwordreset', urlencodedParser, async (req, res) => {
  var respDict = {};
  let userId = await userExistsFc(req.body.email, req.body.password); 
  if (userId == 0) {
    respDict = CITResponse(CODE_EMAIL_PASSWORD_ERR, "邮箱或密码不匹配", "");
  } else {
    if (await updateUserPasswordFc(req.body.email, req.body.password, req.body.newpassword)) {
      respDict = CITResponse(CODE_SUCCESS, "重置成功", "");
    } else {
      respDict = CITResponse(CODE_PASSWORD_RESET_FAILURE, "重置失败", "");
    }
  }
  res.status(200).send(respDict);
});

app.post('/api/listusers', urlencodedParser, async (req, res) => { 
  var respDict = {};
  let userId = await userExistsFc1(req.body.userId, req.body.email); 
  if (userId == 0) {
    respDict = CITResponse(CODE_EMAIL_PASSWORD_ERR, "未登录", "");
  } else {
    let result = await queryAllUserFc();
    respDict = CITResponse(CODE_SUCCESS, "", result);
  }
  res.status(200).send(respDict);
});

app.post('/api/deleteuser', urlencodedParser, async (req, res) => {
  var respDict = {};
  let userId = await userExistsFc1(req.body.userId, req.body.email); 
  if (userId == 0) {
    respDict = CITResponse(CODE_EMAIL_PASSWORD_ERR, "未登录", "");
  } else {
    let result = await deleteUserFc(req.body.deletingUserId);
    respDict = CITResponse(CODE_SUCCESS, "", result);
  }
  res.status(200).send(respDict);
});

app.listen(4000, () => console.log('Server ready on port 4000.'));
module.exports = app;
