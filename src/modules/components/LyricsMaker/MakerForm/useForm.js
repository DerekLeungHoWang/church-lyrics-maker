import { useState, useEffect, useContext } from "react";
import { PropertiesContext } from "../../../context/PropertiesContext";


// ******************************
const useForm = (validator) => {
    const { initState } = useContext(PropertiesContext)
    console.log(initState);
    const [properties, setProperties] = useState(initState);
    console.log(properties);
    const [errors, setErrors] = useState({
        title: "",
        content: ""
    });
    const [isSubmited, setIsSubmited] = useState(false);


    const handleChange = e => {
        const { name, value } = e.target;
        setProperties(() => ({
            ...properties,
            [name]: value
        }));

    };



    // ******************************
    const handleBlur = e => {
        console.log(e.target.name);
        const { name: fieldName } = e.target;
        const faildFiels = validator(properties, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    // ******************************
    const handleSubmit = e => {
        e.preventDefault();
        const { name: fieldName } = e.target;
        const faildFiels = validator(properties, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
        setIsSubmited(true);
    };
    console.log("useForm errors ", errors);
    return {
        properties,
        setProperties,
        handleBlur,
        errors,
        setErrors
    };
};

export default useForm;
