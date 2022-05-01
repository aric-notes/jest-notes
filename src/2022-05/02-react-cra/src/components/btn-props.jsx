export const BtnProps = ({ content, ...props }) => (
  <button {...props}>
    {content}
  </button>
);