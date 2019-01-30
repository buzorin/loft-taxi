import React from 'react';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  }
});

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = props => {
  const { selectProps, innerRef, children, innerProps } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          inputRef: innerRef,
          children: children,
          ...innerProps
        }
      }}
      {...selectProps.textFieldProps}
    />
  );
};

const Option = props => {
  const { innerRef, isFocused, isSelected, innerProps, children } = props;

  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
};

const Menu = props => {
  const { selectProps, innerProps, children } = props;

  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
};

const ValueContainer = props => {
  const { selectProps, children } = props;

  return <div className={selectProps.classes.valueContainer}>{children}</div>;
};

const components = {
  Control,
  Option,
  Menu,
  ValueContainer
};

const SelectField = props => {
  const {
    name,
    options,
    value,
    placeholder,
    onChange,
    isLoading,
    classes,
    theme
  } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };

  const handleChange = name => value => {
    const result = {
      target: {
        name,
        value
      }
    };

    onChange(result);
  };

  const getNoOptionsMessage = () => 'Совпадений не найдено';
  const getLoadingMessage = () => 'Загрузка...';

  return (
    <Select
      classes={classes}
      styles={selectStyles}
      options={options}
      noOptionsMessage={getNoOptionsMessage}
      components={components}
      name={name}
      value={value}
      onChange={handleChange(name)}
      placeholder={placeholder}
      isLoading={isLoading}
      loadingMessage={getLoadingMessage}
      isClearable
    />
  );
};

export default withStyles(styles, { withTheme: true })(SelectField);
