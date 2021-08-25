import { makeStyles } from '@material-ui/core';
import { useState, createContext } from 'react'

export const PropertiesContext = createContext()

function PropertiesContextProvider(props) {
    const useStyles = makeStyles((theme) => ({
        valueLabel: {
            "& > span > span": {
                color: "white",
              
            }
        }
    
    }));

    const [properties, setProperties] = useState({
        text: {
            fontSize: 60,
            fontWeight:400,
            justifyContent: "center",
            alignItems: "center",
            textColor: ""
        },
        image: {
            height: "",
            opacity: "",
            filter: ""
        },
        others: {
            slideAnimation: true
        }
    })
  

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
    const classes = useStyles()
    const value = { properties, setProperties, handleSetProperties,classes }
 
    return (

        <PropertiesContext.Provider value={value}>
            {props.children}
        </PropertiesContext.Provider>
    )
}

export default PropertiesContextProvider;