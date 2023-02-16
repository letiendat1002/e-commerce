const { useEffect, useState } = require('react');

const useDebouce = (value, delay) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setSearchValue(value), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return searchValue;
};

export default useDebouce;
