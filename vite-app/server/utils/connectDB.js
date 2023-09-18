import mongoose from 'mongoose'

export function connectDB (app, MONGO_URL, PORT) {
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`))
}
