const fs = require('fs')
const merge = require('webpack-merge')

function configMegre(Pconf,config){
   const {
      dev = Object.create(null),
      pro = Object.create(null),
      base= Object.create(null)
   } = Pconf
   if(this.type === 'start'){
     return merge(config,base,dev)
   }else{
      return merge(config,base,pro)
   }
}

/**
 * Merge default and custom configuration items
 * @param {*} config default configuration
 */
function megreConfig(config){
   const targetPath = this.path + '/rux.config.js'
   const isExi = fs.existsSync(targetPath)
   if(isExi){
      const perconfig = require(targetPath)
      const mergeConfigResult = configMegre.call(this,perconfig,config)
      return mergeConfigResult
   }
   return config
}

module.exports = megreConfig