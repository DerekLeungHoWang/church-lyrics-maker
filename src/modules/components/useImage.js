import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { storage } from "../firebase";
import { validator } from './LyricsMaker/MakerForm/Validator';
export default function useImage(setLyrics, lyrics, errors, setErrors) {

    const [rawImg, setRawImg] = useState('')
    const [uploadedImg, setUploadedImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0);


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
        let result = validator(lyrics, 'title')

        if (result.title) {
            setIsLoading(false)
            setErrors(state => ({ ...state, 
                title: result.title
             }))
        }

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

        
    }




    return [rawImg, setRawImg, handleUpload, isLoading, uploadedImg]
}
