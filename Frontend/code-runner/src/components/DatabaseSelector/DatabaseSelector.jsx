function DatabaseSelector({ db, onChange }) {
  return (
    <select value={db} onChange={(e) => onChange(e.target.value)}>
      {/* <option value="none">Code</option> */}
      <option value="mongodb">MongoDB</option>
      <option value="sql" disabled>SQL (Coming Soon)</option>
    </select>
  );
}

export default DatabaseSelector;
