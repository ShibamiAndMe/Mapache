const pkg = require('./package.json');
const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');

const zipName = pkg.name + '-' + pkg.version;

const zipFiles = {
	add: ['./**/*'],
	ignore: [
		'!./.git',
		'!./*.editorconfig',
		'!./*.gitignore',
		'!./README.md',
		'!./VERSIONS.md',
		'!./gulpfile.js',
		'!./package-lock.json',
		'!./node_modules',
		'!./node_modules/**',
		'!./dist',
		'!./dist/**'
	]
};

const cleanTask = () => del(['dist']);

const zipTask = () => {
	return gulp.src(zipFiles.add.concat(zipFiles.ignore))
	.pipe(zip(`${zipName}.zip`))
	.pipe(gulp.dest('dist'))
};

gulp.task('clean', cleanTask);
gulp.task('zip', zipTask);

gulp.task('default', gulp.series(cleanTask, zipTask));