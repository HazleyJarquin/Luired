export const useFilterProducts = (
  handleFilterNavigate: (path: string) => void
) => {
  const productFilters = [
    { title: "Bisuteria", action: () => handleFilterNavigate("bisuteria") },
    { title: "Niños", action: () => handleFilterNavigate("niños") },
    { title: "Electronico", action: () => handleFilterNavigate("electronico") },
    {
      title: "Salud y Bienestar",
      action: () => handleFilterNavigate("salud y bienestar"),
    },
  ];

  return { productFilters };
};
