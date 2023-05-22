const expres = require('express')
const app = express()
const {users} = require('./data')
const projectRouter = require('./routes/projects')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req,res) => {
    res.send('Home Page')
})

app.get('/dashboard', (req, res) => {
    res.send('Dashboard page')
})

app.get('/admin', (req,res) => {
    res.send('Admin page')
})

function setUser(req, res, next){
    const userId = req.body.userId
    if(userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

app.listen(3000)