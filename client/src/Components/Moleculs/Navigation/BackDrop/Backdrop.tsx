import "./Backdrop.scss";

interface backDropPropsInterface {
	close(): void;
}

const Backdrop: React.FC<backDropPropsInterface> = ({ close }) => {
	const componentClass = "wtl-backdrop";
	return <div className={componentClass} onClick={close} />;
};

export default Backdrop;
