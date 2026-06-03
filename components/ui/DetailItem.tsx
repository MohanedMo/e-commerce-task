interface DetailItemProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export default function DetailItem({
  label,
  value,
  valueClassName = "text-slate-300",
}: DetailItemProps) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className={`text-sm font-medium capitalize ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}
