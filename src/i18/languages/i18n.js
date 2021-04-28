import i18next from 'i18next';
import {initReactI18next} from 'react-i18next'
import translationEn from '../locales/en/en.json'
import translationKa from '../locales/ka/ka.json'
import translationRu from '../locales/ru/ru.json'


const resources = {
    en:{
        translation: translationEn,
    },
    ka:{
        translation: translationKa
    },
    ru:{
        translation: translationRu
    }
}

i18next
.use(initReactI18next)
.init({
    resources,
    debug: false,
    interpolation:{
        escape: false,
    },
    react:{
        wait:true,
    },
    lng:'en',
})
export default i18next