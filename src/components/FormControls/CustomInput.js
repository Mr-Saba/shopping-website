export default function CustomInput(props) {
  const inputProps = {
    type: 'text',
    value: '',
    placeholder: '',
    ...props
  };
  const onInput = e => {
    if(!props.onInput) {
      return;
    }
    props.onInput(e.target.value);
  }
  return (
    <input type={inputProps.type} onInput={onInput} value={inputProps.value} placeholder={inputProps.placeholder} />
  );
}