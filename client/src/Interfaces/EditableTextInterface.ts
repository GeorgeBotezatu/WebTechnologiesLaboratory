export interface IEditableInput {
	type: string;
	text: string;
	placeholder: string;
	children: JSX.Element;
	childRef: React.MutableRefObject<HTMLInputElement>;
	updateFunction: (text: string) => void;
}
