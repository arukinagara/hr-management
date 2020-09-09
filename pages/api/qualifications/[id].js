import { getSession } from '../../../lib/iron'
import Qualification from '../../../models/qualification'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ qualifications: null })
        break
      }
      const qualifications =
        req.query.id == 'new' ? [Qualification.build()] : await Qualification.findAll({where: {id: req.query.id}})
      res.status(200).json({qualifications: qualifications})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await Qualification.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await Qualification.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await Qualification.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
