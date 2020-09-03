import Local from 'passport-local'
import { findUser } from './user'

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done
) {
  findUser({ username, password })
    .then((user) => {
      // // userが存在しない場合(=findUserでデータを取得できなかった場合)、エラー扱いでreturnする
      // if (!user) return done(null, false)
      done(null, user)
    })
    .catch((error) => {
      done(error)
    })
})
