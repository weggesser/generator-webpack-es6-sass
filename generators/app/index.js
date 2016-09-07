var generator = require('yeoman-generator');

module.exports = generator.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generator.Base.apply(this, arguments);
  },

  settings: {},

  paths: function() {

  },

  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'projectName',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }]).then(function(answers) {
      this.settings = answers;
    }.bind(this));
  },

  copyFiles: function () {
    console.log("We're copying files ...");

    _this = this;

    ['package.json',
     'webpack.config.js',
     'src/index.html',
     'src/js/app.js',
     'src/sass/app.scss'].forEach( function( resource ) {
       _this.fs.copyTpl(
         _this.templatePath( resource ),
         _this.destinationPath( resource ),
         { projectName: _this.settings.projectName }
       );
     });

  },

  dependencies: function () {
    console.log('About to install dependencies ... ');
    this.npmInstall(['webpack',
                     'node-sass',
                     'postcss-loader',
                     'sass-loader',
                     'copy-webpack-plugin',
                     'extract-text-webpack-plugin',
                     'postcss-cssnext',
                     'postcss-nested',
                     'doiuse',
                     'babel-core',
                     'babel-loader',
                     'babel-preset-es2015-webpack',
                     'css-loader'], { 'saveDev': true });
  }
});
