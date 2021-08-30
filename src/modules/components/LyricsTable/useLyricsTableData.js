import React from 'react'

export default function useLyricsTableData() {
 

    //=============================================================Load Table
    useEffect(() => {
        axios.get(`${API_BASE_URL}/lyrics/getAll`)
            .then(res => {
                console.log(res);
                // setCart(res.data)
            })
    }, [])
    return (
        <div>

        </div>
    )
}
