const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// Tareas
gulp.task('sass', () =>{
    return gulp.src([
        // Archivos de origen para convertir
        "node_modules/bootstrap/scss/bootstrap.scss",
        "src/scss/*.scss"
    ])
    // va a ejecutar la tarea sass para webkitConvertPointFromNodeToPage, y el codigo lo va a comprimir para que pese poco
    .pipe(sass({outputStyle:'compressed'}))
    // Aqui es en donde es el destino de los archivos convertidos
    .pipe(gulp.dest('src/css'))
    // Para poder utilizarlo con browserSync
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    -pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
});

gulp.task('iconos', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('fuentes', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

// antes va a ejecutar sass
gulp.task('serve',['sass'], () => {
    // servidor de desarrollo
    browserSync.init({
        // va a tomar los archivos de esa ruta
        server: './src'
    })
    // para que se quede escuchando por cambios para que se refresque por si solo (por si alteramos el codio original de bootstrap y los nuestros)
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ],[sass])
    // para que este atentos a cambios en html
    gulp.watch('src/*.html').on('change',browserSync.reload);
});

gulp.task('default',['js','serve','iconos','fuentes']);