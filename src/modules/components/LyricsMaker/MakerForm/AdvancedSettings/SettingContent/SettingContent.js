import { Container, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import TextControl from './TextControl/TextControl'
import { text_control, image_control, others_settings } from './SettingConstant'
import ImageControl from './ImageControl/ImageControl'
import Others from './Others/Others'
import PropertiesContextProvider, { PropertiesContext } from '../../../../../context/PropertiesContext'
import { arrayToString } from '../../../../util/converter'
export default function SettingContent({ active }) {

    const { properties, setProperties, handleSetProperties , classes} = useContext(PropertiesContext)
    const initializeState = () => (
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [cart, setCart] = useState(initializeState())
    useEffect(() => {

        // let tempAdvSetting = JSON.parse(localStorage.getItem('tempAdvSetting'))||{}
        // if(tempAdvSetting){

        // }
        
  
        // if (cart.length > 0) {
        //     let target = cart.filter(d => {
        //         return d.lastPlayed
        //     })

        //     if (target.length > 0) {
        //         target = arrayToString(cart, target[0])
        //         setProperties(target)
        //     }
        // }
    }, [])

    return (
       
            <Container maxWidth={false}>
                {active == text_control && <TextControl />}
                {active == image_control && <ImageControl />}
                {/* {active == others_settings && <Others />} */}

            </Container>
      
    )
}
