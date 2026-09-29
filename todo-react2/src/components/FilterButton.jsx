function FilterButton({ name, isPressed, setFilter }) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{label}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;