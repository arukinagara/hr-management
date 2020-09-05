import { getSession } from '../../../lib/iron'
import Relative from '../../../models/relative'

export default async function handler(req, res) {
  const session = await getSession(req)
  const relatives = !session ? null : await Relative.findAll({
    where: req.query.staffId ? {staffId: req.query.staffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ relatives: relatives || null })
}
