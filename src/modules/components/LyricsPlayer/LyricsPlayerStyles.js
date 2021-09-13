
import styled from 'styled-components';
export const SlideBackground = styled.div`
 position: relative;
width: 100%;
display: flex;
flex-direction: row;
align-items: "center";
justify-content: "center";
font-size: ${props => `${props.cssSettings.fontSize}px`};

height: ${props => {
        return `${props.cssSettings.height}vh`
    }};

span{
    font-weight: ${props => props.cssSettings.fontWeight};
   }

.bg{
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: ${props => props.cssSettings.opacity};
    width: 100%;
    height: 100%;
    background:  ${props => props.img === "" ? "black" : ` url(${props.cssSettings.img})`};
    background-repeat: no-repeat !important;
    background-size: crop;
    background-size: 100% auto;
    aspect-ratio: 16 / 9;
    filter:${props => {
        
        
        return `blur(${props.cssSettings.blurriness}px)`
    }};
}

`

export const BackgroundImage = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: ${props => props.cssSettings.alignItems};
    justify-content:  ${props => props.cssSettings.justifyContent};
    overflow-wrap:break-word ;
    font-size: ${props => `${props.cssSettings.fontSize}px`};
    text-align :center;
    z-index: -1;
    min-height: ${props => `${props.cssSettings.height}vh`};
   span{
    font-weight: ${props => props.cssSettings.fontWeight}
   }
   .bg{
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: ${props => props.cssSettings.opacity};
    width: 100%;
    height: 100%;
    background:  ${props => props.img === "" ? "black" : ` url(${props.cssSettings.img})`};
    background-repeat: no-repeat !important;
    background-size: cover !important;
    aspect-ratio: 16 / 9;
    filter:${props => `blur(${props.cssSettings.blurriness}px)`};
}
                                        
                                      
`