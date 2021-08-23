import { Container, Typography } from '@material-ui/core'
import React from 'react'
import TextControl from './TextControl/TextControl'
import { text_control, image_control, others_settings } from './SettingConstant'
import ImageControl from './ImageControl/ImageControl'
import Others from './Others/Others'
export default function SettingContent({ active }) {
    return (
        <Container maxWidth={false}>
            {active == text_control && <TextControl />}
            {active == image_control && <ImageControl />}
            {active == others_settings && <Others />}

        </Container>
    )
}
