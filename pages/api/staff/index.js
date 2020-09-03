import { getSession } from '../../../lib/iron'
import Staff from '../../../models/staff'

export default async function handler(req, res) {
  const session = await getSession(req)
  const staff = !session ? null : await Staff.findAll({
    attributes: ['id', 'staffId', 'fullName', 'furigana'],
    order: [['staffId', 'ASC']]
  })

  res.status(200).json({ staff: staff || null })
}
