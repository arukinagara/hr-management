import { getSession } from '../../../lib/iron'
import History from '../../../models/history'

export default async function handler(req, res) {
  const session = await getSession(req)
  const histories = !session ? null : await History.findAll({
    where: req.query.staffId ? {staffId: req.query.staffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ histories: histories || null })
}
