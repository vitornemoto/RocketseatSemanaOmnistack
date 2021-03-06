//dados

const proffys = [
    {   name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp:"8998765445344", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject:"Quimica", 
        cost: "20",
        weekday:[0], 
        time_from:[720],
        time_to:[1220]
    },
    {   name: "Daniele Evangelista", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp:"8998765445344", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject:"Quimica", 
        cost: "20",
        weekday:[0], 
        time_from:[720],
        time_to:[1220]
    },
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]


const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// funcionalidades

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req,res){
    return res.render("index.html")
}

function pageStudy(req,res){
    const filters = req.query
    return res.render("study.html", {proffys,filters, subjects, weekdays})
}

function pageGiveClasses(req,res){
    const data = req.query

    
    const isNotEmpt = Object.keys(data).length > 0
    
    if (isNotEmpt){

        data.subject = getSubject(data.subject)

        //adicionar dados a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }

    return res.render("give-classes.html", {subjects, weekdays})
}

//servidor
const express = require('express')
const server = express()



//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express:server,
    noCache:true,
})

// Inicio e configuração do servidor
server
// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// rotas da aplicação
server.get("/", pageLanding )
server.get("/study", pageStudy)
server.get("/give-classes", pageGiveClasses)

.listen(5500)

// para subir a aplicação no linux entrar na pasta 
// ~/Documents/git/RocketseatSemanaOmnistack/nlw$
// e execute o comando
// node src/server.js