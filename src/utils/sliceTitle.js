export const sliceTitle = (name) => {
    return name && name.length > 14
      ? `${name.slice(0, 16)}...`
      : name && name.length < 14
      ? name.slice(0, 15)
      : "";
  };