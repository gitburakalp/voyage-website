let gulp = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  size = require("gulp-size"),
  plumber = require("gulp-plumber"),
  sourcemaps = require("gulp-sourcemaps"),
  browserslist = require("browserslist");

let roots = {
    srcDir: "./src/",
    jsDir: "./src/js/",
    distDir: "./dist/",
    sourceDir: "../sources/"
  },
  sassOptions = {
    outputStyle: "compressed"
  },
  prefixerOptions = {
    grid: true,
    browsers: ["last 2 versions"]
  },
  jsFiles = [];

var functionsBrowserSync = function(done) {
    browserSync.init({
      server: {
        baseDir: roots.srcDir
      },
      online: true
    });

    done();
  },
  functionsScripts = function() {
    return gulp
      .src(jsFiles)
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(concat("scripts.js"))
      .pipe(gulp.dest(roots.jsDir))
      .pipe(uglify())
      .pipe(
        rename({
          suffix: ".min"
        })
      )
      .pipe(sourcemaps.write(roots.sourceDir))
      .pipe(roots.sourceDir);
  },
  functionsSass = function() {
    return gulp
      .src(roots.srcDir + "scss/main.scss")
      .pipe(plumber())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass(sassOptions))
      .pipe(
        size({
          gzip: true,
          showFiles: true
        })
      )
      .pipe(
        autoprefixer({
          grid: true
        })
      )
      .pipe(
        rename({
          suffix: ".min"
        })
      )
      .pipe(sourcemaps.write(roots.sourceDir, { includeContent: false }))
      .pipe(gulp.dest(roots.srcDir + "css"))
      .pipe(browserSync.stream());
  },
  functionsHtml = function() {
    return gulp.src(roots.srcDir + "**/*.html").pipe(browserSync.stream());
  },
  functionsWatch = function() {
    gulp.watch(roots.srcDir + "scss/**/*.scss", gulp.series("sass"));
    gulp.watch(roots.srcDir + "js/*.js", gulp.series("html"));
    gulp.watch(roots.srcDir + "**/*.html", gulp.series("html"));
  };

gulp.task("browser-sync", functionsBrowserSync);
gulp.task("scripts", functionsScripts);
gulp.task("sass", functionsSass);
gulp.task("html", functionsHtml);
gulp.task("watch", functionsWatch);
gulp.task("default", gulp.series("browser-sync", "html", "sass", "watch"));
