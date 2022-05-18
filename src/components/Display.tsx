function Display(props: {
  value: string
}) {
  return (
    <div className="result">
      {props.value}
    </div>
  );
}

export default Display;