import { getSession } from '../../../lib/iron'
import Project from '../../../models/project'

export default async function handler(req, res) {
  const session = await getSession(req)
  const projects = !session ? null : await Project.findAll({
    where: req.query.staffId ? {staffId: req.query.staffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ projects: projects || null })
}
