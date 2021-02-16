const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// inicio
const app = express();

//configuracion
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname, 'views'));

app.engine(
	'.hbs',
	exphbs({
		defaultLayout: 'main',
		layoutDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs'
		
	})
);
app.set('view engine', '.hbs');

//MIDDELWARE - peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//rutas

app.use(require('./routes'));


//iniciar servidor
app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});
