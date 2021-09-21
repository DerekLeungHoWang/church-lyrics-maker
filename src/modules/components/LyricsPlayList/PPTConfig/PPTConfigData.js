import { FormattedMessage } from "react-intl";

export const pptConfigData=[

    {
        "propName":"height",
        "propLabel": <FormattedMessage id="lyricsPlaylist.config.height" />,
        "min":1,
        "max":100,
        "step": 1,
        "marks": [
            {
                value: 1,
                label: '1%',
            },
            {
                value: 30,
                label: '30%',
            },
            {
                value: 100,
                label: '100%',
            },
        ],
    },
    {
        "propName":"fontSize",
        "propLabel": <FormattedMessage id="lyricsPlaylist.config.fontSize" />,
        "min":1,
        "max":100,
        "step": 1,
        "marks": [
            {
                value: 1,
                label: '1pt',
            },

            {
                value: 30,
                label: '30pt',
            },
            {
                value: 100,
                label: '100pt',
            },
        ],
    },
]
