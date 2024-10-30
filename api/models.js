const CODE_SUCCESS = 0;
const CODE_EMAIL_EXISTS = 100;
const CODE_EMAIL_NOT_EXISTS = 101;
const CODE_EMAIL_PASSWORD_ERR = 102;
const CODE_REGISTRATION_ERR = 103;
const CODE_PASSWORD_RESET_FAILURE = 104;


const CITResponse = (code, message, data) => {
  return {'code': code, "message": message, "data": data};
}


module.exports = {
  CODE_SUCCESS,
  CODE_EMAIL_EXISTS,
  CODE_EMAIL_NOT_EXISTS,
  CODE_EMAIL_PASSWORD_ERR,
  CODE_REGISTRATION_ERR,
  CODE_PASSWORD_RESET_FAILURE,
  CITResponse
}
