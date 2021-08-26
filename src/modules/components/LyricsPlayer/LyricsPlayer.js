import { Button, Container, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './LyricsPlayer.scss'
import Slider from "react-slick";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { wrap } from 'gsap/gsap-core';
import styled from 'styled-components';
import { PropertiesContext } from '../../context/PropertiesContext';

const useStyles = makeStyles((theme) => ({

}), { index: 1 });

const SlideBackground = styled.div`

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

function LyricsPlayer(props) {
    const classes = useStyles()
    let lyricsId = +props.match.params.lyricsId


    const { properties, setProperties, handleSetProperties } = useContext(PropertiesContext)
    let cart = JSON.parse(localStorage.getItem('cart'))
   


    let data = cart.filter((d, i) => (i === lyricsId))[0]
    
    const [fullScreen, setFullScreen] = useState(false)
    const [mouseMove, setMouseMove] = useState(false)
    const slider = useRef(null);
    const handle = useFullScreenHandle();

    let title = data.title.split(',')[0];
    let author_1 = data.title.split(',')[1] ? data.title.split(',')[1] : ""
    let author_2 = data.title.split(',')[2] ? data.title.split(',')[2] : ""
    var timer;



    useEffect(() => {
        var timeout = function () {

            setMouseMove(false)
        }
        timer = setTimeout(timeout, 1000);
        window.onmousemove = function () {
            setMouseMove(true)

            clearTimeout(timer);
            timer = setTimeout(timeout, 1000);
        };

        return () => {
            clearTimeout(timeout)
        }
    }, [timer])


    useEffect(() => {

        slider.current.innerSlider.list.setAttribute('tabindex', 0);
        slider.current.innerSlider.list.focus();

        return () => {

        }
    }, [])




    let fontSize = data.text.fontSize
    let textColor = data.text.textColor === "" ? "#000" : data.text.textColor;

    

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                style={{ display: "none", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div

                style={{ display: "none", background: "green" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    
    const height = data.image.height
    const url = data.img ? data.img : "black";



    const handleDivClick = () => {
        slider.current.innerSlider.list.setAttribute('tabindex', 0);
        slider.current.innerSlider.list.focus();

    }


    let id = +props.match.params.lyricsId
    const next = () => {



        if (id < cart.length - 1) {
            props.history.push(`/player/${id + 1}`)
            slider.current.slickGoTo(0);
        }


    }

    const prev = () => {
        if (id > 0) {

            props.history.push(`/player/${id - 1}`)
            slider.current.slickGoTo(0);
        }

    }


    return (

        <Container
            maxWidth={false} className="lyricsPlayerContainer" style={{ color: textColor }}
            onClick={() => handleDivClick()}

        >
            <div>

                <Button
                    onClick={next}
                    color="primary" variant="outlined"
                    style={{
                        display: mouseMove ? "block" : "none",
                        position: "fixed", bottom: "1%", right: "0.5%",
                        color: "grey"
                    }}
                >
                    下一首
                </Button>
                <Button
                    onClick={prev}
                    style={{
                        display: mouseMove ? "block" : "none",
                        position: "fixed", bottom: "1%", left: "0.5%",
                        color: "grey"
                    }}
                    variant="outlined" color="primary">
                    上一首
                </Button>

                <Button
                    onClick={() => props.history.push("/")}
                    style={{
                        display: mouseMove ? "block" : "none",
                        position: "fixed", bottom: "1%", left: "50%",
                        color: "grey"
                    }}
                    variant="outlined" color="primary">
                    首頁
                </Button>

                <Slider {...settings} ref={slider} >
                    <div  >
                        <SlideBackground
                            fontSize={fontSize}
                            height={height}
                            img={data.img}
                        >
                            <div style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",

                            }}>
                                <span>{title}</span>
                                <span style={{ fontSize: "50%" }}  >{`${author_1}  ${author_2}`}</span>

                            </div>
                        </SlideBackground>
                    </div>
                    {data.content.map((d, i) => {
                        return (
                            <div key={i}  >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflowWrap: "break-word",
                                        fontSize: `${fontSize}px`,
                                        textAlign: "center",
                                        background: data.img === "" ? "black" : `url(${data.img})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        minHeight: `${height}vh`
                                    }}

                                >
                                    <span>{d}</span>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>

        </Container>


    )
}
export default LyricsPlayer;