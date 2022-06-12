/* function tarea(done){ 
    console.log('Desde la primer tarea')
    done() //avisa que la tarea ya finalizo
}

exports.tarea = tarea //se exporta pra llamarla desde la linea de comndos */
const { src, dest, watch, parallel } = require("gulp");
//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");//minifica el codigo de css
const cssnano = require("cssnano"); //minifica el codigo de css
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps"); //ayuda a el navegador a ubicar los elementos de scss y js en sus respectivos archivos

//IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin"); //minimiza imagenes
const webp = require("gulp-webp"); //imagenes webp
const avif =  require("gulp-avif");

//JS
const terser = require("gulp-terser-js"); //minifica el codigo de js

function css(done) {
  //Identidica el archivo sass a compilar
  src("src/scss/**/*.scss") //Los asteriscos hacen que busquen todos los archivos
    .pipe(sourcemaps.init())
    .pipe(plumber()) //Evita que se cierra el gulp cundo haya un error
    .pipe(sass()) //Compilar el archivo sass
    .pipe(postcss([autoprefixer(), cssnano()])) //minifica el codigo de css y lo hace mas rapido y ligero
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")); //Almacenar el archivo sass

  done();
}

function imagenes(done) {
  const opciones = { optimizationLevel: 3};

  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}

function versionWebp(done) {
  const opciones = { quality: 70 };

  src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones)) //transforma a formato webp todas las imagenes
    .pipe(dest("build/img"));

  done();
}

function versionAvif(done) {
  const opciones = { quality: 70 };

  src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones)) //transforma a formato avif todas las imagenes
    .pipe(dest("build/img"));

  done();
}

function javascript(done){
  src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/js"));

  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css); //llama la funcion css, siempre que hayan cambios en la app.scss
  watch("src/js/**/*.js", javascript);

  done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.webp = versionWebp;
exports.versionAvif = versionAvif;
exports.js = javascript;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); //parallel sirve para ejecutar las tareas en orden
