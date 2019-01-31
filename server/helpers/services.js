// services.js
import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../env'
// import User from '../models/user'

const createToken = mail => {

  const payload = {
    sub: mail,
    iat: moment().unix(),
    exp: moment().add(365, 'days').unix(),
  }
  return jwt.encode(payload, config.TOKEN_SECRET)

}

export default createToken
