const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Load the MySQL pool connection
const pool = require('../data/config');
const path = require('path');
const hbs = require('hbs');

// Route the app
const router = app => {
    app.set('./views',path.join(__dirname,'views'));
    app.set('view engine', 'hbs');
    app.use('/assets',express.static(__dirname + '/public'));

    app.get('/', (request, response) => {
            response.render('principal',{
        });
    });

    // Display all users
    app.get('/trabajadores', (request, response) => {
        /*let sql = "SELECT * FROM trabajadores";
        let query = conn.query(sql, (err, results) => {
    if(err) throw err;*/
        pool.query('SELECT * FROM trabajadores', (error, results) => {
            if (error) throw error;
            response.render('admin',{
                results:results
            });
        });
    });

    // Display a single user by ID
    app.get('/trabajador/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM trabajadores WHERE numTrabajador = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/addTrabajador', (request, response) => {
        let sql= "CALL insper('"+request.body.name+"','"+request.body.lastName1+"','"+request.body.lastName2+"','"+request.body.rfc+"',"+request.body.numTrabajador+")";
        pool.query(sql, (error, result) => {
            if (error) throw error;
            response.redirect('/trabajadores');
        });
    });

    // Update an existing user
    app.post('/editTrabajador', (request, response) => {
        const nt = request.body.numTrabajador;
        let sql= "CALL udtper('"+request.body.nombreTrab+"','"+request.body.aPat+"','"+request.body.aMat+"','"+request.body.rfc+"',"+nt+")";
        pool.query(sql, (error, result) => {
            if (error) throw error;
            response.redirect('/trabajadores');
        });
    });
    app.post('/activar', (request, response) => {
        var nt = request.body.numTrabajador;
        var edo = request.body.estado;
        
        if (edo==1) {
            var edo=0;
        }else{
            var edo=1;
        }
            
        let sql= "CALL activar("+request.body.numTrabajador+","+edo+")";
        pool.query(sql, (error, result) => {
                if (error) throw error;
                response.redirect('/trabajadores');
        });
    });
/*
    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });*/
}

// Export the router
module.exports = router;
