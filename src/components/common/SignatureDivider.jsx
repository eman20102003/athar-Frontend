import "../../styles/common/SignatureDivider.css";

const SignatureDivider = ({ label }) => (
  <div className="signature-divider" role="separator">
    <span className="signature-divider__line" />
    <span className="signature-divider__mark">❧</span>
    {label && <span className="signature-divider__label">{label}</span>}
    <span className="signature-divider__line" />
  </div>
);

export default SignatureDivider;