export default function FormInput({
  title,
  type,
  placeholder,
  value,
  onchange,
  admin,
  disabled,
  notRequired,
  name,
  defaultValue,
}) {
  const handleWheel = (e) => {
    // Remove focus so the scroll doesn't change the value
    e.target.blur();
  };
  return (
    <div className="form-row">
      {admin && <label className="form-label">{title}</label>}
      <div className="flex items-center">
        <input
          type={type}
          className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
          placeholder={placeholder}
          value={value}
          name={name}
          onWheel={handleWheel}
          onChange={onchange}
          required={notRequired ? false : true}
          disabled={disabled ? true : false}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
