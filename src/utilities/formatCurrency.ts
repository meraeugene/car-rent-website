const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export const formatCurrency = (value: string | number) => {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  if (Number.isNaN(numberValue)) {
    return ""; // Return an empty string or a placeholder value for empty or invalid numbers
  }

  return CURRENCY_FORMATTER.format(numberValue);
};
