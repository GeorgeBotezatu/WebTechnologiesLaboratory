import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import CvModelOne from "./CvModelOne";
import { useReactToPrint } from "react-to-print";

const Example = () => {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div style={{ width: "50rem", height: "20rem" }}>
			<CvModelOne ref={componentRef} />
			<button onClick={handlePrint}>Print this out!</button>
		</div>
	);
};

export default Example;
