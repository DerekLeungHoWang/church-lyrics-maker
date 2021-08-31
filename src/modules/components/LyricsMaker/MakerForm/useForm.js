import { useState, useEffect, useContext } from "react";
import { PropertiesContext } from "../../../context/PropertiesContext";


// ******************************
const useForm = (validator) => {
    const { initState } = useContext(PropertiesContext)
    
    const [properties, setProperties] = useState(initState);
    
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
    
    return {
        properties,
        setProperties,
        handleBlur,
        errors,
        setErrors
    };
};

export default useForm;
