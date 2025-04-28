import { Pool } from 'pg'

const connectionPool = new Pool({
  connectionString: 'postgresql://postgres:123412345@localhost:5432/blogpost',
})
export default connectionPool
