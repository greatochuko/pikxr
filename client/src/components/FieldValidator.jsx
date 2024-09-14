import styles from "../styles/FieldValidator.module.css";
import PropTypes from "prop-types";

export default function FieldValidator({ field, error }) {
  return field ? (
    <div
      className={`${styles.fieldError} ${error.validated && styles.validated}`}
      title={error.message}
    >
      {error.validated ? <>&#10003;</> : "!"}
    </div>
  ) : null;
}

FieldValidator.propTypes = {
  field: PropTypes.string,
  error: PropTypes.object,
};
