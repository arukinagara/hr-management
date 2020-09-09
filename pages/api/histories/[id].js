import { getSession } from '../../../lib/iron'
import History from '../../../models/history'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ histories: null })
        break
      }
      const histories =
        req.query.id == 'new' ? [History.build()] : await History.findAll({where: {id: req.query.id}})
      res.status(200).json({histories: histories})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await History.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await History.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await History.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
