import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import path from 'path';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const DIST = 'dist';
const dist = function (subpath) {
    return !subpath ? DIST : path.join(DIST, subpath);
};

gulp.task('default', ['clean'], (cb) => {
    runSequence(
        'copy',
        'lint',
        'js',
        cb
    );
});

gulp.task('clean', () =>  del([dist()]));

gulp.task('copy', () =>
    gulp.src('src/bower_components/**/*')
        .pipe(gulp.dest(dist('bower_components')))
);

gulp.task('lint', () =>
    gulp.src('src/**/*.{js,html}')
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
);

gulp.task('js', () =>
    gulp.src(['src/**/*.{js,html}', '!src/bower_components/**/*'])
        .pipe($.sourcemaps.init())
        .pipe($.if('*.html', $.crisper({scriptInHead: false})))
        .pipe($.if('*.js', $.babel()))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(dist()))
);

gulp.task('serve', ['default'], () => {
    browserSync({
        port: 5001,
        notify: false,
        logPrefix: 'PSK',
        snippetOptions: {
            rule: {
                match: '<span id="browser-sync-binding"></span>',
                fn: function(snippet) {
                    return snippet;
                }
            }
        },
        https: true,
        server: dist()
    });

    gulp.watch(['src/**/*.{js,html}'], ['lint', 'js', reload]);
});