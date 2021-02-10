const dropdownStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor:'#18191C',
    width: '100%',
    maxWidth: '115px',
  }),
  control: base => ({
    ...base,
    background: 'none',
    color:'white',
    border: 'none',
    width: '100%',
    maxWidth: '115px',
    zIndex:2,
  }),
  singleValue: base => ({
    ...base,
    color: '#CCCCCC',
  }),
  option: (provided, state) => ({
    ...provided,
    color:'white',
    backgroundColor: state.isFocused ? '#5c6fb1' : 'none',
  }),
}

const dropdownUserStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor:'#18191C',
    width: '400%',
    maxWidth: '300px',
  }),
  control: base => ({
    ...base,
    background: 'none',
    color:'white',
    border: 'none',
    width: '100%',
    maxWidth: '115px',
    zIndex:2,
    whiteSpace:'nowrap',
  }),
  singleValue: base => ({
    ...base,
    color: '#CCCCCC',
  }),
  option: (provided, state) => ({
    ...provided,
    color:'white',
    backgroundColor: state.isFocused ? '#5c6fb1' : 'none',
  }),
}
export {
  dropdownStyles,
  dropdownUserStyles
}