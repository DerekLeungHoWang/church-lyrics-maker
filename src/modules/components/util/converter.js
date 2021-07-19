export const stringToArray = (cart, target) => {
    let newContent = target.content
    if (!Array.isArray(target.content)) {
        newContent = target.content.trim().split("\n\n");
        target.content = newContent
    }
    return target;
}

export const arrayToString = (cart, target) => {
    let newContent = target.content
    if (cart.length > 0 && Array.isArray(target.content)) {
        
        newContent = target.content.map((d, i) => {
            if (i < target.content.length - 1) {
                
                
                d = d.concat("\n\n")
                
            }
            return d
        })
        target.content = newContent
        target.content = target.content.join('')
    }
    return target;
}

export const addToCart = () => {

}