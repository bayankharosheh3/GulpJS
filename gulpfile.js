const gulp = require("gulp");
var browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

gulp.task("styles", function () {
  return gulp
    .src(["src/css/*.css", "node_modules/bootstrap/dist/css/bootstrap.css"])
    .pipe(concat("app.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task("images", function () {
  return gulp.src("src/images/*").pipe(gulp.dest("dist/images"));
});

gulp.task("scripts", function () {
  return gulp
    .src(["src/js/main.js", "node_modules/bootstrap/dist/js/bootstrap.js"])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp
    .watch("src/css/*.css", gulp.series("styles"))
    .on("change", browserSync.reload);
  gulp
    .watch("src/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp
    .watch("src/images/*", gulp.series("images"))
    .on("change", browserSync.reload);
  gulp
    .watch("src/js/main.js", gulp.series("scripts"))
    .on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series("styles", "html", "images", "scripts", "watch")
);
