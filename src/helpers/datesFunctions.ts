

export const getDaysDistanceFromCurrentDate = ( date: Date ): number => {

    const currentDate = new Date()

    // Define the number of milliseconds in one day
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const diffInTime = date.getTime() > currentDate.getTime()
                            ? date.getTime() - currentDate.getTime()
                            : currentDate.getTime() - date.getTime()

    // Convert to days and round to the nearest integer
    const diffInDays = Math.round(Math.abs(diffInTime / oneDay));

    return diffInDays;
    
}

export const getDaysDistanceFromTwoGivenDates = ( firstDate: Date, secondDate: Date ): number => {

    // Define the number of milliseconds in one day
    const oneDay = 1000 * 60 * 60 * 24;

    // Adding four hours to received date due to hours gap
    firstDate.setHours( firstDate.getHours() + 4 )
    secondDate.setHours( secondDate.getHours() + 4 )

    // Calculate the difference in milliseconds
    const diffInTime = secondDate.getTime() - firstDate.getTime();

    // Convert to days and round to the nearest integer
    const diffInDays = Math.round(Math.abs(diffInTime / oneDay));

    return diffInDays;

}