import { connect } from 'react-redux'
import MediaPlayerBody from '../MediaPlayerBody'
import NonMediaBody from '../Templates/NonMedia/NonMediaBody'
import LargeGraphicBody from '../Templates/Shared/LargeGraphicBody'
import AlertBody from '../AlertBody'
import TextBody from '../Templates/Shared/TextBody'
import DoubleGraphicBody from '../Templates/DoubleGraphicWithSoftbuttons/DoubleGraphicBody'

const mapStateToProps = (state) => {
    var activeApp = state.activeApp
    var metadata = state.ui[activeApp] ? state.ui[activeApp] : null
    var props = {
        mainField1: null,
        mainField2: null,
        mainField3: null,
        mainField4: null,
        alertText1: null,
        alertText2: null,
        alertText3: null,
        graphic: null,
        secondaryGraphic: null

    }

    if(metadata) {
        metadata.showStrings.map ((textField) => {
            switch (textField.fieldName) {
                case "mainField1":
                    props.mainField1 = textField.fieldText
                    break
                case "mainField2":
                    props.mainField2 = textField.fieldText
                    break
                case "mainField3":
                    props.mainField3 = textField.fieldText
                    break
                case "mainField4":
                    props.mainField4 = textField.fieldText
                    break
            }
        })
        props.graphic = metadata.graphic ? metadata.graphic.value : null
        props.secondaryGraphic = metadata.secondaryGraphic ? metadata.secondaryGraphic.value : null
    }

    for(var app in state.ui) {
        if(state.ui[app].alert.showAlert) {
            state.ui[app].alert.alertStrings.map((textField) => {
                switch (textField.fieldName) {
                    case "alertText1":
                        props.alertText1 = textField.fieldText
                        break
                    case "alertText2": 
                        props.alertText2 = textField.fieldText
                        break
                    case "alertText3":
                        props.alertText3 = textField.fieldText
                        break
                }
            })
        }
    }

    if(!state.ui[activeApp]) { 
        //No active app, do not assign color scheme
        return props
    }

    //Assign color scheme to props
    var theme = state.theme
    console.log("metadata theme: " + theme)
    var colorScheme = null;
    if (theme === true) { //Dark theme
        if(state.ui[activeApp].nightColorScheme) {
            if(state.ui[activeApp].nightColorScheme.backgroundColor) {
                props.colorScheme = state.ui[activeApp].nightColorScheme.backgroundColor
            }
        }
    } else {
        if(state.ui[activeApp].dayColorScheme) { //Light theme
            if(state.ui[activeApp].dayColorScheme.backgroundColor) {
                props.colorScheme = state.ui[activeApp].dayColorScheme.backgroundColor
            }
        }
    }
    
    return props
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export const MediaMetadata = connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaPlayerBody)

export const NonMediaMetadata = connect(
    mapStateToProps,
    mapDispatchToProps
)(NonMediaBody)

export const LargeGraphic = connect(
    mapStateToProps,
    mapDispatchToProps
)(LargeGraphicBody)

export const AlertStrings = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertBody)

export const TextFields = connect(
    mapStateToProps,
    mapDispatchToProps
)(TextBody)

export const DoubleGraphic = connect(
    mapStateToProps,
    mapDispatchToProps
)(DoubleGraphicBody)

export default MediaMetadata