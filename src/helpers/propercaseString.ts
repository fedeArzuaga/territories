
export const propercaseString = ( str: string ) => {
    return str.split(' ').map( ( word: string ) => `${word[0].toUpperCase()}${word.slice(1)}` ).join(" ")
}
