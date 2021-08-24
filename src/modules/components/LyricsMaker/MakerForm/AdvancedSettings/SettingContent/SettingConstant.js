import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
export const text_control = "textcontrol"
export const image_control = "imagecontrol"
export const others_settings = "others"

export const font_size = "fontSize"
export const type_textField = "textField"
export const type_buttonGroup = "buttonGroup"
export const type_buttonColor = "color"

export const text_properties = [
    {
        "name": "fontSize",
        "displayName": "Font Size",
        "inputType": "textField",
        "marks": [
            {
                value: 20,
                label: '20px',
            },

            {
                value: 60,
                label: '60px',
            },
            {
                value: 90,
                label: '90px',
            },
        ],
        "min": 20,
        "max": 90,
        "step": 1,

    },

    {
        "name": "fontWeight",
        "displayName": "Font Weight",
        "inputType": "textField",
        "marks": [
            {
                value: 200,
                label: '200',
            },

            {
                value: 300,
                label: '300',
            },
            {
                value: 400,
                label: '400',
            },
            {
                value: 500,
                label: '500',
            },
            {
                value: 600,
                label: '600',
            },
            {
                value: 700,
                label: '700',
            },
            {
                value: 800,
                label: '800',
            },
            {
                value: 900,
                label: '900',
            },
        ],
        "min": 200,
        "max": 900,
        "step": 100,
    },
    {
        "name": "justifyContent",
        "displayName": "Justify Content",
        "inputType": "buttonGroup",
        "options": [
            <FormatAlignLeftIcon />,
            <FormatAlignCenterIcon />,
            <FormatAlignRightIcon />
        ]
    },
    {
        "name": "alignItems",
        "displayName": "Align Items",
        "inputType": "buttonGroup",
        "options": [
            <VerticalAlignTopIcon />,
            <VerticalAlignCenterIcon />,
            <VerticalAlignBottomIcon />
        ]
    },
    {
        "name": "color",
        "displayName": "Text Colour",
        "inputType": "color",

    },
]
export const image_properties = ["height", "opacity", "filter"]
export const others_properties = ["animation"]