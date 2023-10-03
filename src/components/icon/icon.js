import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Icon = (props) => {
  return (
    <FontAwesomeIcon icon={icon({ name: props.name, style: props.iconStyle })} />
  );
};

Icon.defaultProps = {
  name: null,
  iconStyle: "solid",
};

// Define PropTypes
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  iconStyle: PropTypes.string.isRequired,
};

export default Icon;
