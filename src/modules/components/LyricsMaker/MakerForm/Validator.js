

// ******************************
export const validator = (values, fieldName) => {
    console.log(fieldName);
    let errors = {};
    switch (fieldName) {
        case "title":
            validateTitle(values.title, errors);
            break;
        case "content":
            validateContent(values.content, errors);
            break;
        // case "phone":
        //     validatePhoneNumber(values.phone, errors);
        //     break;
        default:
    }
    return errors;
};


// ******************************
function validateTitle(title, errors) {

    let result = true;
    if (!title) {
        errors.title = "*必須填寫此欄";
        result = false;
    }
    console.log('result = ', result);
    return result;
}
// ******************************
function validateContent(content, errors) {
    let result = true;

    if (!content) {
        errors.content = "*必須填寫此欄";
        result = false;
    }

    return result;
}
