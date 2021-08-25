import { useState, useEffect } from "react";

const initState = {
    title: "",
    content: ``,
    fontSize: 60,
    fontColor: "#fff",
    img: "",
    height: 100,
    textColor: "#fff",
    lastPlayed: false
}
// ******************************
const useForm = (validator) => {
    console.log(initState);

    const [lyrics, setLyrics] = useState(initState);
    console.log(lyrics);
    const [errors, setErrors] = useState({
        title: "",
        content: ""
     

    });
    const [isSubmited, setIsSubmited] = useState(false);

 
    const handleChange = e => {
        const { name, value } = e.target;
        setLyrics(() => ({
            ...lyrics,
            [name]: value
        }));

    };

 

    // ******************************
    const handleBlur = e => {
        console.log(e.target.name);
        const { name: fieldName } = e.target;
        const faildFiels = validator(lyrics, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    // ******************************
    const handleSubmit = e => {
        e.preventDefault();
        const { name: fieldName } = e.target;
        const faildFiels = validator(lyrics, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
        setIsSubmited(true);
    };
    console.log("useForm errors ", errors);
    return {
        lyrics,
        setLyrics,
        handleBlur,
        errors,
        setErrors
    };
};

export default useForm;
