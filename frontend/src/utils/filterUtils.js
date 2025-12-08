export const applyFilters = (products, filters) => {
    let filteredList = [...products];
    const { priceFrom, priceTo, discount, sortBy } = filters;

    if (discount) {
        filteredList = filteredList.filter(item => item.discont_price !== null);
    }

    const minPrice = parseFloat(priceFrom);
    if (!isNaN(minPrice)) {
        filteredList = filteredList.filter(item => {
            const actualPrice = item.discont_price !== null ? item.discont_price : item.price;
            return actualPrice >= minPrice;
        });
    }

    const maxPrice = parseFloat(priceTo);
    if (!isNaN(maxPrice)) {
        filteredList = filteredList.filter(item => {
            const actualPrice = item.discont_price !== null ? item.discont_price : item.price;
            return actualPrice <= maxPrice;
        });
    }

    if (sortBy !== 'default') {
        filteredList.sort((a, b) => {
            const priceA = a.discont_price !== null ? a.discont_price : a.price;
            const priceB = b.discont_price !== null ? b.discont_price : b.price;

            if (sortBy === 'price_asc') {
                return priceA - priceB;
            }
            if (sortBy === 'price_desc') {
                return priceB - priceA;
            }
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    }

    return filteredList;
};