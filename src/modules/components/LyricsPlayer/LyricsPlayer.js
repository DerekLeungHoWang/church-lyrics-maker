import { Button, Container, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './LyricsPlayer.scss'
import Slider from "react-slick";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { wrap } from 'gsap/gsap-core';
import styled from 'styled-components';
import { PropertiesContext } from '../../context/PropertiesContext';
import { BackgroundImage, SlideBackground } from './LyricsPlayerStyles';

const useStyles = makeStyles((theme) => ({

}), { index: 1 });



function LyricsPlayer(props) {
    const { locale } = props
    const classes = useStyles()
    let lyricsId = +props.match.params.lyricsId
    const { properties, setProperties, handleSetProperties } = useContext(PropertiesContext)
    let cart = JSON.parse(localStorage.getItem('cart'))
    let data = cart.filter((d, i) => (i === lyricsId))[0]
    const [fullScreen, setFullScreen] = useState(false)
    const [mouseMove, setMouseMove] = useState(false)
    const slider = useRef(null);
    const handle = useFullScreenHandle();
    let title = data.title;
    let author_1 = data.composer
    let author_2 = data.lyricist
    let timer;

    const cssSettings = {
        img: data.img,
        fontSize: data.text.fontSize,
        fontWeight: data.text.fontWeight,
        textColor: data.text.textColor === "" ? "#000" : data.text.textColor,
        alignItems: data.text.alignItems,
        justifyContent: data.text.justifyContent,
        height: data.image.height,
        opacity: data.image.opacity / 100,
        blurriness: data.image.blurriness
    }

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
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    // const url = data.img ? data.img : "black";



    const handleDivClick = () => {
        slider.current.innerSlider.list.setAttribute('tabindex', 0);
        slider.current.innerSlider.list.focus();

    }


    let id = +props.match.params.lyricsId


    const next = () => {

        if (id < cart.length - 1) {
            props.history.push(`/${locale}/player/${id + 1}`)

        }
        slider.current.slickGoTo(0);

    }

    const prev = () => {
        if (id > 0) {

            props.history.push(`/${locale}/player/${id - 1}`)

        }
        slider.current.slickGoTo(0);
    }


    return (

        <Container
            maxWidth={false} className="lyricsPlayerContainer" style={{ color: cssSettings.textColor }}
            onClick={() => handleDivClick()}

        >
            <div>





                <Slider {...settings} ref={slider} >
                    <div  >
                        <SlideBackground
                            cssSettings={cssSettings}

                        >
                            <div class="bg"></div>
                            <div style={{
                                height: `${cssSettings.height}vh`,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: cssSettings.justifyContent,
                                justifyContent: cssSettings.alignItems,

                            }}>
                                <span>{title}</span>
                                <span style={{ fontSize: "50%" }}  >{`${author_1}  ${author_2}`}</span>

                            </div>
                        </SlideBackground>
                    </div>
                    {data.content.map((d, i) => {
                        return (
                            <div key={i}  >
                                <BackgroundImage
                                    cssSettings={cssSettings}


                                >
                                    <div class="bg"></div>
                                    <span>{d}</span>
                                </BackgroundImage>
                            </div>
                        )
                    })}
                </Slider>
            </div>
            <Button
                onClick={next}
                color="secondary" variant="contained"
                style={{
                    display: mouseMove ? "block" : "none",
                    position: "fixed", bottom: "1%", right: "0.5%",
                    color: "white"
                }}
            >
                {cart[id + 1] ? `Next Song: ${cart[id + 1].title}` : "NO NEXT SONG"}
            </Button>
            <Button
                onClick={() => props.history.push("/")}
                style={{
                    display: mouseMove ? "block" : "none",
                    position: "fixed", bottom: "1%", left: "50%",
                    color: "white"
                }}
                variant="contained" color="secondary">
                Home
            </Button>
            <Button
                onClick={prev}
                style={{
                    display: mouseMove ? "block" : "none",
                    position: "fixed", bottom: "1%", left: "0.5%",
                    color: "white"
                }}
                variant="contained" color="secondary">
                {cart[id - 1] ? `Previous Song: ${cart[id - 1].title}` : "NO PREVIOUS SONG"}
            </Button>

        </Container>


    )
}
export default LyricsPlayer;