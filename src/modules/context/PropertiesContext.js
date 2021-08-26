import { makeStyles } from '@material-ui/core';
import { useState, createContext } from 'react'
import { validator } from '../components/LyricsMaker/MakerForm/Validator'
export const PropertiesContext = createContext()

function PropertiesContextProvider(props) {
    const initState = {
        title: "",
        content: ``,
        // fontSize: 60,
        // fontColor: "#fff",
        img: "",
        // height: 100,
        // textColor: "#fff",
        lastPlayed: false,
        text: {
            fontSize: 60,
            fontWeight: 400,
            justifyContent: "center",
            alignItems: "center",
            textColor: "#fff"
        },
        image: {
            height: 100,
            opacity: "",
            filter: ""
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
        content: ""
    });


    const handleSetProperties = (config, newValue) => {
        console.log('setting', config, newValue);
        setProperties(state => ({
            ...state,
            [config.channel]: {
                ...state[`${config.channel}`],
                [config.property]: newValue
            }

        }))

    }
    const handleSave = () => {
        console.log("handling save");
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        console.log(properties);
    }
    const handleBlur = e => {
        console.log(e.target.name);
        const { name: fieldName } = e.target;
        const faildFiels = validator(properties, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    const classes = useStyles()
    const value = { properties, setProperties, handleSetProperties, classes, handleSave, initState,errors, setErrors, handleBlur }

    return (

        <PropertiesContext.Provider value={value}>
            {props.children}
        </PropertiesContext.Provider>
    )
}

export default PropertiesContextProvider;