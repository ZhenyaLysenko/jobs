var gulp     = require('gulp'),
sass         = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS     = require('gulp-clean-css'),
rename       = require('gulp-rename'),
browserSync  = require('browser-sync').create(),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglify'),
del          = require('del'),
imagemin     = require('gulp-imagemin'),
pngquant     = require('imagemin-pngquant'),
cache        = require('gulp-cache'),
csscomb      = require('gulp-csscomb'),
htmlmin      = require('gulp-htmlmin'),
zip          = require('gulp-zip'),
gm           = require('gulp-gm'),
spritesmith  = require('gulp.spritesmith');

// LiveReload Browser-sync
gulp.task('browser-sync', ['styles', 'scripts'], function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
		notify: false
	});
});

// Стили
gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions' , 'Android 2.3', 'Android >= 4', 'Chrome >= 29', 'Firefox >= 24', 'Explorer >= 9', 'Opera >= 15', 'Safari >= 7.1', 'ios 6'], cascade: false}))
	.pipe(csscomb())
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

// Скрипты
gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-1.11.2.min.js',
		'./app/libs/jquery-ui/js/jquery-ui.min.js',
		'./app/libs/owl.carousel/dist/owl.carousel.min.js',	
		'./app/libs/liMarquee/jquery.liMarquee.js',	
		'./app/libs/easytabs/lib/jquery.easytabs.min.js',	
		'./app/libs/equalheight/dist/jquery.equalheight.js',
		'./app/libs/jquery.maskedinput/jquery.maskedinput.min.js',
		'./app/libs/magnific-popup/js/magnific-popup-custom.min.js'
			])
	.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
	});

// Сжатие HTML
gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('app/html-min'))
});

// Очистка папки dist
gulp.task('clean', function() {
	return del.sync('dist');
});

// 
// ИЗОБРАЖЕНИЯ
// 
// Сборка и Сжатие фото 
gulp.task('compress-img', function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/img'));
});

// Изменение размера фото
gulp.task('resize-img', function () {
	gulp.src('app/img/resize/*')
	 .pipe(gm(function (gmfile) {
    return gmfile.resize(150 , 150 , "!");
  }, {
    imageMagick: true
  }))
	.pipe(rename({suffix: '-small'}))
	.pipe(gulp.dest('app/img/dist'));
});

// Создание спрайтов
gulp.task('sprites', function () {
  var spriteData = gulp.src('app/img/sprites/*')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass',
    algorithm: "top-down"
  }));
  return spriteData.pipe(gulp.dest('app/img/dist'));
});

// Очистка кэша фотографий
gulp.task('clear', function() {
	return cache.clearAll();
});


gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);



// СБОРКА ПРОЕКТА
gulp.task('build' , [ 'clean' , 'html' , 'compress-img' ,'styles' , 'scripts'] , function(){
	var buildCss = gulp.src([
		'app/css/fonts.min.css',
		'app/css/main.min.css',
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var  buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/html-min/*.html')
	.pipe(gulp.dest('dist'));
});

// Запаковка проекта
gulp.task('zip' , function () {
	return gulp.src('*')
	.pipe(zip('site.zip'))
	.pipe(gulp.dest('./'));
});