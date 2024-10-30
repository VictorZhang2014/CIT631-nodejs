const { sql } = require('@vercel/postgres');
const { INIT_SQL_STATEMENTS } = require('./db_sql');

const consoleF = (msg) => {
  console.log(msg);
}

const initSQLFc = async () => {
  let result = await sql`${INIT_SQL_STATEMENTS}`;
  consoleF(`数据表初始化成功！`);
  consoleF(`${JSON.stringify(result)}`);
}

const addUserFc = async (email, password) => {
  let result = await sql`INSERT INTO Users(Email, Password) VALUES(${email}, ${password});`;
  let flag = result.rowCount > 0;
  if (!flag) {
    consoleF(`添加用户失败！${JSON.stringify(result)}`);
  }
  return flag;
}

const userExistsFc = async (email, password) => {
  let result = await sql`SELECT id FROM Users WHERE Email=${email} AND Password=${password};`; 
  let rows0 = result.rows && result.rows.length > 0 && result.rows[0];  
  return rows0 && rows0.id || 0; 
}

const userExistsFc1 = async (userId, email) => {
  let result = await sql`SELECT id FROM Users WHERE Id=${userId} AND Email=${email};`; 
  let rows0 = result.rows && result.rows.length > 0 && result.rows[0];  
  return rows0 && rows0.id || 0; 
}

const updateUserPasswordFc = async (email, password, newPassword) => { 
  let result = await sql`UPDATE Users SET Password=${newPassword} WHERE Email=${email} AND Password=${password};`;
  let flag = result.rowCount > 0;
  if (!flag) {
    consoleF(`重置用户密码失败！${JSON.stringify(result)}`);
  }
  return flag;
}

const queryAllUserFc = async () => {
  let result = await sql`SELECT Id, Email FROM Users;`; 
  return result.rows;   
}

const deleteUserFc = async (deletingUserId) => { 
  let result = await sql`DELETE FROM Users WHERE Id=${deletingUserId};`;
  let flag = result.rowCount > 0;
  if (!flag) {
    consoleF(`删除用户失败！${JSON.stringify(result)}`);
  }
  return flag;
}


module.exports = {
  initSQLFc,
  addUserFc,
  userExistsFc,
  userExistsFc1,
  updateUserPasswordFc,
  queryAllUserFc,
  deleteUserFc,
}
