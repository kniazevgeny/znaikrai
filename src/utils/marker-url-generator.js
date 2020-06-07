import Vue from 'vue'
import Marker from '../components/Marker'
import MarkerCovid from '../components/MarkerCovid'

// create a constructor from a Vue component
const MarkerConstructor = Vue.extend(Marker)
const MarkerCovidConstructor = Vue.extend(MarkerCovid)

export const getColoredMarkerUrl = (fillColor, isCovid) => {
    // create a Vue element with required props
    // origin: https://medium.com/better-programming/dynamic-svg-markers-for-google-maps-in-vue-js-7541fa1a54a
    let iconComponent;
    if (!isCovid)
        iconComponent = new MarkerConstructor({ propsData: { fillColor } })
    else
        iconComponent = new MarkerCovidConstructor({ propsData: { fillColor } })
    // mount the component shadow DOM
    iconComponent.$mount()
    // get icon DOM element
    const iconDom = iconComponent.$el
    // generate an html string from an element
    const iconString = new XMLSerializer().serializeToString(iconComponent.$el)
    // finally, generate a data url from a string
    return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(iconString)
}