
import styled from 'styled-components';
export const SlideBackground = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: "center";
justify-content: "center";
font-size: ${props => `${props.fontSize}px`};
background:  ${props => props.img === "" ? "black" : ` url(${props.img})`};
min-height: ${props => {
        return `${props.height}vh`
    }};
background-repeat: no-repeat !important;
background-size: cover !important;
`

export const BackgroundImage = styled.div`
    width: 100%;
    display: flex;
    align-items: ${props => props.alignItems};
    justify-content:  ${props => props.justifyContent};
    overflow-wrap:break-word ;
    font-size: ${props => `${props.fontSize}px`};
    text-align :center;
    background:${props => props.img === "" ? "black" : `url(${props.img})`};
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: ${props => `${props.height}vh`};
                                        
                                      
`