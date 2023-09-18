import supertest from 'supertest'
import mongoose from 'mongoose'
import { createServer } from '../utils/server'

const PORT = process.env.PORT || 9000
const app = createServer()
const request = supertest(app)

describe('BrowserInfo', () => {
  beforeAll(async () => {
    await mongoose
      .connect(process.env.MONGO_URL_DEV, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(async () => {
        app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))
      })
      .catch((error) => console.log(`${error} did not connect`))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('/browser-statistics', () => {
    it('gets browser information', async () => {
      const response = await request.get('/api/analytics/browser-statistics')

      expect(response.status).toBe(200)
    })
  })
})
