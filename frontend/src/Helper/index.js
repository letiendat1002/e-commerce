const formatProductPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
};

export default formatProductPrice