var con = require('../lib/conexionbd');

function listadoDePeliculas(req, res) {
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    
       //var sql = "select anio, titulo, nombre from pelicula inner join genero on pelicula.genero_id = genero.id where titulo like '"+ titulo +"%' and anio like '"+ anio +"%' and nombre like '"+ genero+"%'";
    var sql = "select * from pelicula limit 0,52";
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'peliculas': resultado,
        }
        res.send(JSON.stringify(response))
    });

    if (titulo) {
        var sql = "select * from pelicula where titulo like '" + titulo + " %' order by titulo limit 0,52";
        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            var response = {
                'peliculas': resultado

            }
            res.send(JSON.stringify(response))
        });
    }
    if (anio) {
        var sql = "select * from pelicula where anio ='" + anio + "%' order by titulo limit 0,5";
        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            var response = {
                'peliculas': resultado,
            }
            res.send(JSON.stringify(response))
        });
    }

};

function listadoDeGeneros(req, res) {

    var genero = req.query.genero;
    var sql = "select * from genero";
    con.query(sql, function (error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'generos': resultado
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));
    });

    /*if (genero) {
        var sql = "select * from pelicula inner join genero on pelicula.genero_ id = genero.id where nombre = '"+ genero +"'";
        con.query(sql, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            var response = {
                'generos': resultado,
            }
            console.log(response);
            res.send(JSON.stringify(response))
        });
    }*/
}

module.exports = {
    listadoDePeliculas: listadoDePeliculas,
    listadoDeGeneros: listadoDeGeneros
}