import { groupByAttribute, ungroupItems } from "./groups";

describe("Group array", () => {
  it("should group array by attribute", () => {
    const list = [
      { name: "Sherlock Homes", category: "Suspense" },
      { name: "Morte no nilo", category: "Suspense" },
      { name: "Harry Potter e a pedra filosofal", category: "Fantasia" },
      { name: "Harry Potter e a câmera secreta", category: "Fantasia" },
      { name: "Harry Potter e o prisioneiro de Azkaban", category: "Fantasia" },
    ];

    const listGrouped = groupByAttribute(list, "category");
    expect(listGrouped.length).toBe(2);
  });

  it("should ungroup array", () => {
    const listGrouped = [
      [
        { name: "Sherlock Homes", category: "Suspense" },
        { name: "Morte no nilo", category: "Suspense" },
      ],
      [
        { name: "Harry Potter e a pedra filosofal", category: "Fantasia" },
        { name: "Harry Potter e a câmera secreta", category: "Fantasia" },
        {
          name: "Harry Potter e o prisioneiro de Azkaban",
          category: "Fantasia",
        },
      ],
    ];

    const list = ungroupItems(listGrouped);
    expect(list.length).toBe(5);
  });
});
