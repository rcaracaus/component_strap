//load plugins
var gulp             = require('gulp'),
    $                = require('gulp-load-plugins')(),
    sass             = require('gulp-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    clean            = require('gulp-clean'),
    del              = require('del'),
    minifyCSS        = require('gulp-minify-css'),
    include          = require('gulp-include'),
    browserSync      = require('browser-sync'),
    concat           = require('gulp-concat');


options = {}

// Define the style guide paths and options.
options.styleGuide = {
    source: 'scss',
    destination: 'styleguide',

    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        'css/styles.css'
    ],
    template: "node_modules/kss/generator/twig/template"
};

// ##################
// Build style guide.
// ##################
var flags = [], values;
// Construct our command-line flags from the options.styleGuide object.
for (var flag in options.styleGuide) {
    if (options.styleGuide.hasOwnProperty(flag)) {
        values = options.styleGuide[flag];
        if (!Array.isArray(values)) {
            values = [values];
        }
        for (var i = 0; i < values.length; i++) {
            flags.push('--' + flag + '=\'' + values[i] + '\'');
        }
    }
}
gulp.task('styleguide', ['clean:styleguide'], $.shell.task(
  ['node_modules/.bin/kss-node <%= flags %>'],
  {templateData: {flags: flags.join(' ')}}
));


// Clean styleguide directory.
gulp.task('clean:styleguide', del.bind(null, ['styleguide/*.html', 'public'], {force: true}));


gulp.task('clean-css', function () {
    return gulp.src('styleguide/css', {read: false})
        .pipe(clean());
});

// Static server
gulp.task('watch', ['styles', 'scripts', 'styleguide'], function() {
    browserSync({
        server: {
            baseDir: "./styleguide"
        }
    });

    gulp.watch(['scss/**/*.scss'], ['styles']);

    gulp.watch(['scss/**/*.html'], ['styleguide', browserSync.reload]);

    gulp.watch(['scss/components/**/*.js'], ['scripts', browserSync.reload]);

});

gulp.task('styles', function() {
    return gulp.src('scss/styles.scss')
        .pipe(include())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('styleguide/css')).pipe(browserSync.reload({stream: true}));
});

gulp.task('default', function(){
    gulp.start('styleguide', 'styles');
});

gulp.task('scripts', function() {
    return gulp.src(['./bower_components/jquery/dist/jquery.min.js', './scss/components/**/*.js'])
        .pipe(concat('components.js'))
        .pipe(gulp.dest('./styleguide/js'));
});

