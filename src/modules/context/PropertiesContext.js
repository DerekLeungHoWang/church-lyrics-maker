import { makeStyles } from '@material-ui/core';
import { useState, createContext } from 'react'
import { validator } from '../components/LyricsMaker/MakerForm/Validator'
export const PropertiesContext = createContext()

function PropertiesContextProvider(props) {
    const initState = {
        title: "",
        composer: "",
        lyricist: "",
        content: "",
        img: "",

        text: {
            fontSize: 60,
            fontWeight: 400,
            justifyContent: "center",
            alignItems: "center",
            textColor: "#fff"
        },
        image: {
            height: 30,
            opacity: 100,
            blurriness: 0
        },
        others: {
            slideAnimation: true
        }
    }

    const useStyles = makeStyles((theme) => ({
        valueLabel: {
            "& > span > span": {
                color: "white",

            }
        }

    }));

    const [properties, setProperties] = useState(initState)
    const [errors, setErrors] = useState({
        title: "",
        content: "",
        imgSrc:"",
    });
    const handleSmartSplit = () => {
        let content = properties.content
        
        if (Array.isArray(content)) {
            content = content.join("\n\n")
        }
        content = content.split(/\r?\n/);
        let myarray = [];
        for (let i = 0; i < content.length; i += 2) {

            if (content[i] == "") {
                
                i++;

            }
            if (content[i + 1] == undefined || content[i + 1] == "") {
                myarray.push(content[i]); //this doesn't strip '\n'
            } else {

                myarray.push(content[i] + "\n" + content[i + 1]); //this doesn't strip '\n'
            }

        }
        
        setProperties(state => ({
            ...state,
            content: myarray
        }))


    }



    const handleSetProperties = (config, newValue) => {

        setProperties(state => ({
            ...state,
            [config.channel]: {
                ...state[`${config.channel}`],
                [config.property]: newValue
            }

        }))

    }
    const handleSave = () => {

        //  let advancedSetting = JSON.parse(localStorage.getItem('advancedSetting')) || {}
        //  localStorage.setItem('tempAdvSetting',JSON.stringify(properties))

    }
    const handleBlur = e => {

        const { name: fieldName } = e.target;
        const faildFiels = validator(properties, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    const classes = useStyles()
    const value = { properties, setProperties, handleSetProperties, classes, handleSave, initState, errors, setErrors, handleBlur, handleSmartSplit }

    return (

        <PropertiesContext.Provider value={value}>
            {props.children}
        </PropertiesContext.Provider>
    )
}

export default PropertiesContextProvider;