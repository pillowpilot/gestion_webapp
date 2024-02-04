const capitalizeEachWord = (s) =>
    s
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

export { capitalizeEachWord };