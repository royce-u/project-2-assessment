const express = require('express');
const methodOverride = require('method-override');
let db = require('./models')
let router = require('express').Router()


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
    db.widget.findAll()
        .then((widget) => {
            res.render('main', { widget })
            
        })
        .catch(err => {
            res.send(err)
        })
})

app.post('/', (req, res) => {
    db.widget.create(req.body)
    .then(() => {
        console.log(req.body)
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
})

app.delete('/:id', (req, res) => {
    db.widget.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
        res.send(err)
    })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(process.env.PORT || 3000);
