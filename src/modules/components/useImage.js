import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function useImage(setLyrics) {

    const [rawImg, setRawImg] = useState('')
    const [uploadedImg, setUploadedImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let clientId = "546c25a59c58ad7";

    useEffect(() => {
        window.addEventListener("paste", function (e) {
            var item = e.clipboardData.items[0];
            if (item.type.indexOf("image") === 0) {
                var blob = item.getAsFile();
                let bodyFormData = new FormData();
                var reader = new FileReader();
                reader.onload = function (event) {
                    console.log('onload');
                    let raw = event.target.result;
                    setRawImg(raw)
                };

                reader.readAsDataURL(blob);
            }



        });
        return () => {
            window.removeEventListener("paste", () => {
                console.log('removed paste');
            })
        }
    }, [])

    const handleUpload = (e) => {
        setIsLoading(true)
        let base64 = rawImg.replace(/^data:image\/(png|jpg);base64,/, "");
        axios({
            method: 'post',
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': 'Client-ID ' + clientId
            },
            data: {
                'image': base64,
                'type':'base64'
            }
        }).then(function (response) {
            setIsLoading(false)
            setUploadedImg(response.data.data.link)
            console.log(response.data.data.link);
            setLyrics(state=>({
                ...state,
                img:response.data.data.link
            }))
        }).catch(function (error) {
            console.log(error.response);
        });
    }




    return [rawImg, setRawImg, handleUpload, isLoading, uploadedImg]
}
