
const KeyValueCharityBox = ({
  icon,
  label,
  value,
}: {
  icon: string;
  value: string;
  label: string;
}) => {
  return (
    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center mb-1 text-xl">
        <i className={`${icon}`}></i>
      </div>
      <div className="text-sm sm:text-lg font-semibold text-gray-900">
        {value}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
};

export default KeyValueCharityBox;
