var raml2html = require('raml2html')
var configWithDefaultTemplates = raml2html.getDefaultConfig()
var fs = require('fs')

raml2html.render(__dirname + '/api.raml', configWithDefaultTemplates).then(function(result) {
  fs.writeFileSync(__dirname + '/out/index.html', result)
}, function (err) {
  console.log('Error in raml2html: ' + err)
  process.exit(1)
})