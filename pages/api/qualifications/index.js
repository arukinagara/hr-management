import { getSession } from '../../../lib/iron'
import Qualification from '../../../models/qualification'

export default async function handler(req, res) {
  const session = await getSession(req)
  const qualifications = !session ? null : await Qualification.findAll({
    where: req.query.staffId ? {staffId: req.query.staffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ qualifications: qualifications || null })
}
