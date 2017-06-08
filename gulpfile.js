const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const clean = require("gulp-clean");

var paths = {
    scss: {
        src: './src/scss/main.scss',
        dest: './public/styles'
    },
    pug: {
        src: './src/index.pug',
        dest: './public'
    },
    js: {
        src: './src/js/*.js',
        dest: './public/js'
    },
    images: {
        src: './src/images/*.{JPG,jpg,png,gif}',
        dest: './public/img'
    },
    fonts: {
        src: './src/fonts/*.*',
        dest: './public/fonts'
    },
    watch: {
        styles: './src/styles/**/*.scss',
        views: './src/**/*.pug',
        js: './src/js/**/*.js'
    },
    clean: './public/*'
}

gulp.task('styles', () => {
    return gulp.src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
})

gulp.task('views', () => {
    return gulp.src(paths.pug.src)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.pug.dest))
})

gulp.task('js', () => {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
})

gulp.task('images', () => {
    return gulp.src(paths.images.src)
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', () => {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
})

gulp.task('clean', () => {
    return gulp.src(paths.clean, {read: false})
        .pipe(clean());
});

gulp.task('build',
    gulp.series('clean',
        gulp.parallel('views', 'styles', 'js', 'images')
    )
)

gulp.task('watch', () => {
    gulp.watch(paths.watch.styles, gulp.series('styles'))
    gulp.watch(paths.watch.views, gulp.series('views'))
    gulp.watch(paths.watch.js, gulp.series('js'))
})