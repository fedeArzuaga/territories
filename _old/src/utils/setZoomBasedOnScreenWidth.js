import React from 'react'

export const setZoomBasedOnScreenWidth = () => {
    const screenWidth = document.getElementsByTagName("html")[0].clientWidth;
    if ( screenWidth < 400 ) {
        return 12;
    } else if ( screenWidth > 401 && screenWidth < 1000 ) {
        return 13;
    } else {
        return 14;
    }
}
