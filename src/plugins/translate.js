
export default {
    install: (app, options) => {
        let wpTranslate = false
        if (typeof wp !== 'undefined' && wp && wp.i18n) {
            wpTranslate = wp.i18n.__
        }
        app.config.globalProperties.$translate = (text) => {
            console.log(text);
            return wpTranslate ? wpTranslate(text,'garage-configurator') : text 
        }
    }
  }