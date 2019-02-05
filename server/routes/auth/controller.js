import sha256 from 'sha256'
import moment from 'moment'
import sgMail from '@sendgrid/mail'
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
        user.imageUrl = ''
        user.role = 'client'
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

  const newPassword = sha256(Date.now().toString()).substr(1, 15)

  User.findOneAndUpdate(
    { email: req.body.email },
    { password: sha256(newPassword) },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (doc) {

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: req.body.email,
          from: 'info@sushihomearg.com',
          subject: 'Sushi Home - Nueva contraseña',
          text: `Gracias por contactarnos! Tu nueva contraseña es: newPassword ${newPassword}. `,
          html: '<div>'
          + '<h1>Gracias por contactarnos!</h1>'
          + '<h3>Tu nueva contraseña es: </h3>'
          + `<h2>${newPassword}</h2>`
          + '<p>Ingresa a nuestra web para personalizarla: </p>'
          + '<a href="http://sushihomearg.com/">http://sushihomearg.com/</a>'
          + '</div>',
        }
        sgMail.send(msg)

        return res.status(200).send({ status: 'OK' })

      }

      return res.boom.unauthorized('Username doesn`t exist')

    }
  )

}

export const resetPassword = (req, res) => {

  User.findOneAndUpdate(
    { email: req.body.email, password: sha256(req.body.currentPassword) },
    { password: sha256(req.body.newPassword) },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (doc) {

        return res.status(200).send({ status: 'OK' })

      }

      return res.boom.unauthorized('Username doesn`t exist')

    }
  )

}

export const logout = (req, res) => {

  User.findOneAndUpdate(
    { email: req.body.email },
    { token: null },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (doc) {

        return res.status(200).send({ message: 'logout' })

      }

      return res.boom.unauthorized('Username doesn`t exist')

    }
  )

}

export const serverStatus = (req, res) => res.status(200).send({ status: 'OK' })
