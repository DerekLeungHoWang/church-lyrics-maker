import { useState, createContext } from 'react'

export const PropertiesContext = createContext()

function PropertiesContextProvider(props) {

    const [properties, setProperties] = useState({
        text: {
            fontSize: "",
            fontWeight: "",
            textColor: ""
        },
        image: {},
        others: {}
    })

    const handleSetProperties = (config, newValue) => {
        console.log('setting');
        setProperties(state => ({
            ...state,
            [config.channel]: {
                ...state[`${config.channe}`],
                [config.property]: newValue
            }

        }))

    }

    const value = { properties, setProperties, handleSetProperties }

    return (

        <PropertiesContext.Provider value={value}>
            {props.children}
        </PropertiesContext.Provider>
    )
}

export default PropertiesContextProvider;