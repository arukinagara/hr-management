import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../lib/password-local'
import { encryptSession } from '../../lib/iron'
import { setTokenCookie } from '../../lib/auth-cookies'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    // passportを使いログイン処理を行う
    // {session: false}は認証が成功しても、セッションの継続をしない(別建てでやるから？)
    // (error, token) => 以降はカスタムコールバックで、認証の成功/失敗時の処理を記述する
    // passport.authenticateで関数が生成され、それは続く(req, res)を引数に動く
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

// usernameとpasswordを使ったローカル認証を使うことを定義する
// ここでlib/password-localとつながる
passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      // 上のauthenticateを呼び出す
      // 認証が成功するとuserにはsequelizeオブジェクトが、失敗するとfalseが設定される
      const user = await authenticate('local', req, res)

      // userがfalseなら認証に失敗したとして401を返す
      if (!user) {
        res.status(401).send('auth error')
        return
      }

      // スプレッド構文でuserオブジェクトをsessionにコピーしている
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user.dataValues }

      // @hapi/ironでuserオブジェクト(からコピーしたsession)を、クッキーに保存可能な暗号化文字列に変換する
      // The token is a string with the encrypted session
      const token = await encryptSession(session)

      // (パッケージの)cookieを使って、レスポンスヘッダにSetCookieに暗号化文字列を仕込む
      setTokenCookie(res, token)
      res.status(200).send({ done: true })
    } catch (error) {
      console.error(error)
      res.status(401).send(error.message)
    }
  })
