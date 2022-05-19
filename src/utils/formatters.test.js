import {
  formatCpf,
  formatCpfToString,
  formatMoneyToDecimal,
} from "./formatters";

describe("CPF formatter", () => {
  it("should mask cpf", () => {
    const cpf = "12345678910";
    const cpfFormatted = formatCpf(cpf);
    expect(cpfFormatted).toBe("123.456.789-10");
  });

  it("should unmask cpf", () => {
    const cpfFormatted = "123.456.789-10";
    const cpf = formatCpfToString(cpfFormatted);
    expect(cpf).toBe("12345678910");
  });

  it("should format money to decimal", () => {
    const firstMoney = formatMoneyToDecimal("R$ 50,10");
    const secondMoney = formatMoneyToDecimal("R$ 190.500,99");

    expect(firstMoney).toBe("50.10");
    expect(secondMoney).toBe("190500.99");
  });
});
