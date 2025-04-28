import express from 'express'
import cors from 'cors'
import connectionPool from './utils/db.mjs'

const app = express()
const port = process.env.PORT || 4001

app.use(cors())
app.use(express.json())

app.post('/posts', async (req, res) => {
  try {
    const {
      body: { title, image, category_id, description, content, status_id },
    } = req

    const createPost = await connectionPool.query({
      text: 'INSERT INTO posts (title, image, category_id, description, content, status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [title, image, category_id, description, content, status_id],
    })

    return res.status(201).json({ message: 'Created post successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})
