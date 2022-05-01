export const Btn = ({ content, onClick, ...props }) => (
  <button {...props} onClick={onClick}>
    {content}
  </button>
);