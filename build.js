var raml2html = require('raml2html')
var configWithDefaultTemplates = raml2html.getDefaultConfig()
var fs = require('fs')
var path = require('path')

function CheckDirectoryExists(path, success) {
  console.log('Checking path: ' + path)
  
  fs.stat(path, function (err, stats) {
    if (err) {
      console.error('Unable to get path information: ' + err.message)
      return process.exit(1)
    }
    
    if (!stats.isDirectory()) {       
      console.error('Path is not a directory: ' + err.message)
      return process.exit(1)
    }
    success()
  })
}

function WriteOutput(filename, data, success) {
  console.log('Output file: ' + filename)
      
  fs.writeFile(filename, data, function (err) {
    if (err) {
      console.error('Unable to write: ' + err.message)
      return process.exit(1)
    }
    
    success()
  })
}

raml2html
  .render(__dirname + '/api.raml', configWithDefaultTemplates)
  .then(function (result) {
    var outPath = path.join(__dirname, 'out')
    
    CheckDirectoryExists(outPath, function () {
      var outputFile = path.join(outPath, 'index.html')
      
      WriteOutput(outputFile, result, function () {
        console.log('raml2html succeeded.');
      })
    })
  }, function (err) {
    console.error('Error in raml2html: ' + err)
    process.exit(1)
  })
  
  