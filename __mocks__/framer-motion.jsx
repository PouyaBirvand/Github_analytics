const React = require('react');

const motion = {
  div: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('div', { ...rest, ref });
  }),
  section: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('section', { ...rest, ref });
  }),
  button: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('button', { ...rest, ref });
  }),
  span: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('span', { ...rest, ref });
  }),
  h1: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('h1', { ...rest, ref });
  }),
  h2: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('h2', { ...rest, ref });
  }),
  h3: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('h3', { ...rest, ref });
  }),
  p: React.forwardRef((props, ref) => {
    const { whileHover, whileTap, whileInView, initial, animate, exit, transition, ...rest } = props;
    return React.createElement('p', { ...rest, ref });
  }),
};

const AnimatePresence = ({ children }) => children;

module.exports = {
  motion,
  AnimatePresence,
};
