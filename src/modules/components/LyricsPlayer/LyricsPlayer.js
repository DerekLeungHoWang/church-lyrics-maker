import { Container } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import './LyricsPlayer.scss'
import Slider from "react-slick";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
function LyricsPlayer(props) {

    const slider = useRef(null);
    const handle = useFullScreenHandle();
    useEffect(() => {

        slider.current.innerSlider.list.setAttribute('tabindex', 0);
        slider.current.innerSlider.list.focus();
        handle.enter()

    }, [])
    let lyricsId = +props.match.params.lyricsId
    let cart = JSON.parse(localStorage.getItem('cart'))

    let data = cart.filter((d, i) => (i === lyricsId))[0]
    let fontSize = data.fontSize
    let fontColor = data.fontColor === "" ? "#000" : data.fontColor;


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
    const height = data.height === "" ? 20 : data.height
    const url = data.img ? data.img : "black";

    console.log(height);
    return (
        <FullScreen handle={handle}>
            <Container

                maxWidth={false} className="lyricsPlayerContainer" style={{ color: fontColor }}>
                <div >
                    <Slider {...settings} ref={slider} >
                        <div  >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: `${fontSize}px`,
                                    justifyContent: "center",
                                    background: data.img === "" ? "black" : `url(${data.img})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    minHeight: `${height}vh`
                                }}
                            >
                                <h3>{data.title}</h3>
                            </div>
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

                                            fontSize: `${fontSize}px`,
                                            padding: "0% 1%",
                                            textAlign: "center",
                                            background: data.img === "" ? "black" : `url(${data.img})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            minHeight: `${height}vh`
                                        }}

                                    >
                                        <h3>{d}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </Container>
        </FullScreen>
    )
}
export default LyricsPlayer;