import sha256 from 'sha256'
import moment from 'moment'
import User from '../../models/user'
import createToken from '../../helpers/services'

export const signUp = (req, res) => {

  const token = createToken(req.body.email)

  User.findOneAndUpdate(
    { email: req.body.email },
    {},
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) {

        const user = new User()
        user.email = req.body.email
        user.password = sha256(req.body.password)
        user.token = token
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.phone = req.body.phone
        user.address = req.body.address
        user.imageUrl = req.body.imageUrl
        user.role = req.body.role
        user.dateAdded = moment()
        user.isVisible = true
        user.isActive = true

        return user.save((error, data) => {

          const newUser = {
            _id: data._id,
            email: data.email,
            token: data.token,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            address: data.address,
            imageUrl: data.imageUrl,
            role: 'client',
            isVisible: true,
          }

          if (error) return res.boom.badImplementation('', { error })
          return res.status(200).send({ message: 'user created', doc: newUser })

        })

      }
      return res.boom.badData('User already exists')

    }
  )

}

export const signIn = (req, res) => {

  const token = createToken(req.body.email)

  User.findOneAndUpdate(
    { email: req.body.email, password: sha256(req.body.password) },
    { token },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (doc) {

        const newUser = {
          _id: doc._id,
          email: doc.email,
          token,
          firstName: doc.firstName,
          lastName: doc.lastName,
          phone: doc.phone,
          address: doc.address,
          imageUrl: doc.imageUrl,
          role: 'client',
          isVisible: true,
        }

        return res.status(200).send({ status: 'OK', doc: newUser })

      }

      return res.boom.unauthorized('Incorrect username or password')

    }
  )

}

export const forgotPassword = (req, res) => {

  // obtener los datos del body de la req (email)
  // buscar en la base de datos el mismo email
  //   *  si no existe no hacer nada
  //   *  si existe generar una nueva password, pisarla en base de datos
  // enviar la nueva contraseña por mail
  // sengrid para emails

}

export const logout = (req, res) => {

  // remove token from db
  res.status(200).send({ message: 'logout' })

}

export const serverStatus = (req, res) => res.status(200).send({ status: 'OK' })
