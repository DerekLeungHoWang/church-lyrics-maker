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
export const type_slider = "slider"
export const type_buttonGroup = "buttonGroup"
export const type_buttonColor = "color"
export const type_switch = "switch"

export const text_properties = [
    {
        "propName": "fontSize",
        "displayName": "Font Size",
        "inputType": type_slider,
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
                value: 80,
                label: '80px',
            },
        ],
        "min": 20,
        "max": 80,
        "step": 1,

    },

    {
        "propName": "fontWeight",
        "displayName": "Font Weight",
        "inputType": type_slider,
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
        "propName": "justifyContent",
        "displayName": "Horizontal Alignment",
        "inputType": "buttonGroup",
        "options": [
            {
                "icon": <FormatAlignLeftIcon />,
                "propValue": "flex-start"
            },
            {
                "icon": <FormatAlignCenterIcon />,
                "propValue": "center"
            },
            {
                "icon": <FormatAlignRightIcon />,
                "propValue": "flex-end"
            },
        ]
    },
    {
        "propName": "alignItems",
        "displayName": "Vertical Alignment",
        "inputType": "buttonGroup",
        "options": [
            {
                "icon": <VerticalAlignTopIcon />,
                "propValue": "flex-start"
            },
            {
                "icon": <VerticalAlignCenterIcon />,
                "propValue": "center"
            },
            {
                "icon": <VerticalAlignBottomIcon />,
                "propValue": "flex-end"
            },
        ]
    },
    {
        "propName": "color",
        "displayName": "Text Colour",
        "inputType": "color",

    },
]
export const image_properties = [

    {
        "propName": "height",
        "displayName": "Height",
        "inputType": type_slider,
        "marks": [
            {
                value: 10,
                label: '10%',
            },

            {
                value: 50,
                label: '50%',
            },
            {
                value: 100,
                label: '100%',
            },
        ],
        "min": 10,
        "max": 100,
        "step": 10,

    },
    {
        "propName": "opacity",
        "displayName": "Opacity",
        "inputType": type_slider,
        "marks": [
            {
                value: 10,
                label: '10%',
            },

            {
                value: 50,
                label: '50%',
            },
            {
                value: 100,
                label: '100%',
            },
        ],
        "min": 10,
        "max": 100,
        "step": 10,

    },
    {
        "propName": "filter",
        "displayName": "Filter",
        "inputType": type_slider,
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
]



export const others_properties = [
    {
        "propName": "animation",
        "inputType": type_switch,
        "propValue": true

    }

]