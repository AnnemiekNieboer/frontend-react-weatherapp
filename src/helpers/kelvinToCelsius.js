function kelvinToCelsius(kelvin) {
    return `${Math.round(kelvin - 273.15)}° C`
}

// nog kortere versie dmv. arrow functie
// export default (kelvin) => `${Math.round(kelvin - 273.15)}° C`;

export default kelvinToCelsius;