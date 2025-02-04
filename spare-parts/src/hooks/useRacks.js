import { useState } from "react"



export const useRacks = () => {

    const [currentLocation, setCurrentLocation] = useState('');


    const handlerLocation = (location) => {
        console.log(location)
        setCurrentLocation(location)
    }

    return {
        currentLocation,
        handlerLocation
    }
}