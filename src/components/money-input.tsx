import { NumericFormat } from "react-number-format";

export const MoneyInput = ({
  name,
  placeHolder,
  value,
  setValue,
}: {
  name: string;
  placeHolder: string;
  value?: string;
  setValue: (value: string) => void;
}) => {
  return (
    <NumericFormat
      name={name}
      value={value}
      placeholder={placeHolder}
      onValueChange={(values) => setValue(values.value)}
      fixedDecimalScale
      decimalScale={2}
      decimalSeparator="."
      allowNegative={false}
      allowLeadingZeros={false}
      thousandSeparator={"'"}
      suffix="₮"
      className="outline-none w-full font-light bg-transparent  text-lg focus:text-xl p-2 border-b-2 border-primary-50"
    />
  );
};
