let express = require('express')
let app = express()

app.use(express.static(__dirname + '/public'))

let expressHbs = require('express-handlebars')
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/sync', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('database sync completed!')
    })
})

app.get('/:page', (req, res) => {
    let banners = {
        blog: 'Our Blog',
        category: 'Shop Category',
        single_product: 'Product Details',
        checkout: 'Product Checkout',
        confirmation: 'Confirmation',
        cart: 'Shopping Cart',
        single_blog: 'Blog Details',
        login: 'Login',
        register: 'Register',
        tracking_order: 'Tracking',
        contact: 'Contact'
    }
    let page = req.params.page
    let underscorePage = page.replace('-', '_')
    res.render(page, { banner: banners[underscorePage] })
})


app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), () => {
    console.log('Server is running at port ' + app.get('port'))
})