var con = require("../lib/conexionbd");

function listadoDePeliculas(req, res) {
    var sql;
    var col;
    var tipo;
    var filtro = "";
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;

    if (titulo) {
        filtro += "AND titulo LIKE '" + titulo + "%'";
    }
    if (anio) {
        filtro += "AND anio LIKE '" + anio + "%'";
    }
    if (req.query.genero) {
        filtro += "AND genero_id = '" + req.query.genero + "'";
    }

    if (req.query.columna_orden) {
        col = "pelicula." + req.query.columna_orden;
    } else {
        col = titulo;
    }

    if (req.query.tipo_orden) {
        tipo = req.query.tipo_orden;
    } else {
         tipo = "ASC";
    }

    sql = "SELECT * FROM pelicula WHERE 1=1 " + filtro + " ORDER BY " + col + " " + tipo + " LIMIT " + pagina * cantidad + "," + cantidad;
    
    var queries = [ sql, "SELECT COUNT(*) AS total FROM pelicula WHERE 1=1 "+ filtro];
    con.query(queries.join(';'), function (error, resultado, fields) {
        if(error){
            return res.status(404).send("Hubo un error en la consulta");
        } 
        var response= {
            'peliculas': resultado[0], 
            'total': resultado[1]
        }
        res.send(JSON.stringify(response));
    });
    
}

function buscarPeliculaId(req, res) {
    
    var id = req.params.id;
    var sql ="select * from pelicula inner join genero on pelicula.genero_id=genero.id inner join actor_pelicula on pelicula.id=pelicula_id inner join actor on actor.id=actor_id and pelicula.id =" +id ;
    console.log(sql)
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            return res.status(404).send("No se encontro ninguna canción con ese id");
        } else {
            var response = {
                pelicula: resultado[0],
                actores: resultado[0],
                genero: resultado[0]
            };
            console.log(response)
            res.send(JSON.stringify(response));
        }
    });
}

function listadoDeGeneros(req, res) {
    var sql = "select * from genero";
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            generos: resultado
        };

        res.send(JSON.stringify(response));
    });
}

function recomendacionPelicula(req, res) {
    var puntuacion = req.query.puntuacion;
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var genero = req.query.genero;

    if (anio_inicio) {
        filtro += "AND anio LIKE '%" + anio_inicio + "%'";
    }
    if (anio_fin) {
        filtro += "AND anio LIKE '%" + anio_fin + "%'";
    }
    if (puntuacion) {
        filtro += "AND puntuacion = '" + puntuacion + "'";
    }
    if (genero) {
        filtro += "AND genero_id = '" + req.query.genero + "'";
    }
    sql = "SELECT * FROM pelicula WHERE 1=1 " + filtro;
     console.log(sql)
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response={
            'peliculas':resultado
        }
        res.send(JSON.stringify(response));
    });
}

module.exports = {
    listadoDePeliculas: listadoDePeliculas,
    listadoDeGeneros: listadoDeGeneros,
    buscarPeliculaId: buscarPeliculaId,
    recomendacionPelicula: recomendacionPelicula
};
