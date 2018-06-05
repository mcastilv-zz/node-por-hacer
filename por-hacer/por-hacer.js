const fs = require('fs');

let listadoPorHace = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHace);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {

        listadoPorHace = require('../db/data.json');

    } catch (error) {
        listadoPorHace = [];
    }

}

const getListado = () => {

    cargarDB();
    return listadoPorHace;

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHace.push(porHacer);

    guardarDB();

    return porHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHace.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHace[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHace.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (nuevoListado.length === listadoPorHace) {
        return false;
    } else {
        listadoPorHace = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}