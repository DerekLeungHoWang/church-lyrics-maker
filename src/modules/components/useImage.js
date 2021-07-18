import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { storage } from "../firebase";
export default function useImage(setLyrics,lyrics) {

    const [rawImg, setRawImg] = useState('')
    const [uploadedImg, setUploadedImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0);

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

        const uploadTask = storage.ref('images').child(lyrics.title)
            .putString(base64, 'base64', { contentType: 'image/jpg' })

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(lyrics.title)
                    .getDownloadURL()
                    .then(url => {
                        setIsLoading(false)
                        console.log(url);
                        setLyrics(state => ({
                            ...state,
                            img: url
                        }))
                    });
            }
        );
        // axios({
        //     method: 'post',
        //     url: 'https://api.imgur.com/3/image',
        //     headers: {
        //         'Authorization': 'Client-ID ' + clientId
        //     },
        //     data: {
        //         'image': base64,
        //         'type':'base64'
        //     }
        // }).then(function (response) {
        //     setIsLoading(false)
        //     setUploadedImg(response.data.data.link)
        //     console.log(response.data.data.link);
        //     setLyrics(state=>({
        //         ...state,
        //         img:response.data.data.link
        //     }))
        // }).catch(function (error) {
        //     console.log(error.response);
        // });
    }




    return [rawImg, setRawImg, handleUpload, isLoading, uploadedImg]
}
