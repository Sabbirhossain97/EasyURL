export const formateDate = (date) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };;
    return date.toLocalDateString('en-US', options).replace(',', '').replace(' ', '-');
}