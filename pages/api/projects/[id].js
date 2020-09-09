import { getSession } from '../../../lib/iron'
import Project from '../../../models/project'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ projects: null })
        break
      }
      const projects = req.query.id == 'new' ? [Project.build()] : await Project.findAll({where: {id: req.query.id}})
      res.status(200).json({projects: projects})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await Project.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await Project.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await Project.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
