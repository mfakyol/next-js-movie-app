function IconWrapper({ children, ...rest }) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...rest}>
      {children}
    </svg>
  );
}

export default IconWrapper;
