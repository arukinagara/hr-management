import { getSession } from '../../../lib/iron'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      const staff = !session ? null : await Staff.findAll({where: {id: req.query.id}})
      res.status(200).json({ staff: staff || null })
      break
    case 'POST':
      break
    case 'PUT':
      const put = JSON.parse(req.body)
      await Staff.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break
    case 'DELETE':
      break
    default:
  }
}
