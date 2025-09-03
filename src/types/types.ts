import { FieldValues, Path } from 'react-hook-form';

export interface TabFieldItem<T extends FieldValues = FieldValues> {
	label: string;
	name: Path<T>;
	type: string;
	options?: { value: string | number; label: string }[] | string[];
	required?: boolean;
	tab: number;
	colspan?: string;
}
