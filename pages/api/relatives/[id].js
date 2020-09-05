import { getSession } from '../../../lib/iron'
import Relative from '../../../models/relative'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ relatives: null })
        break
      }
      const relatives = req.query.id == 'new' ? [Relative.build()] : await Relative.findAll({where: {id: req.query.id}})
      res.status(200).json({relatives: relatives})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await Relative.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await Relative.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      break

    default:
  }
}
