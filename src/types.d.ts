declare namespace React {
	function lazy<T extends ComponentType<any>>(
		factory: () => Promise<{ default: T }>
	): T;
}

type SetItemStateFunctionSearch<T> = React.Dispatch<
	React.SetStateAction<T>
>;

interface FetchDataProps {
	query: string;
	page: number;
}

interface UseFetchDataResult<T> {
	query: string;
	data: T[];
	totalItems: number;
	loading: boolean;
	error: string | null;
}

interface UseFetchDataProps<T> {
	fetchData: (args: FetchDataProps) => Promise<
		| {
				data: T[];
				totalItems: number;
		  }
		| undefined
	>;
	searchParams: {
		search?: string;
		category?: string;
	};
}

interface UseTableDataProps<T extends object> {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	initialData: T[] | undefined;
	totalItems: number;
	columns: { key: keyof T; text: string }[];
	fetchData: (args: { query: string; page: number }) => Promise<
		| {
				data: T[];
				totalItems: number;
		  }
		| undefined
	>;
}

interface EmployeeDocuments {
	document_name: string;
	file_path: string;
}

interface UserProps {
	user_login: string;
	password: string;
}

interface EmployeeProps {
	id: number;
	user_login: string;
	user_pass: string;
	employee_unique_id: string;
	department_id: number | string;
	designation_id: number | string;
	department_name?: string;
	designation_name?: string;
	first_name: string;
	last_name: string;
	employee_avatar: string;
	date_of_birth: Date;
	gender: 'Male' | 'Female' | 'Other';
	marital_status: 'Single' | 'Married' | 'Divorced' | 'Widowed';
	present_address: string;
	permanent_address: string;
	phone_number: number;
	email: string;
	overtime_status: 'Yes' | 'No';
	nid_number: string;
	date_of_joining: Date;
	date_of_termination: string;
	employment_status: 'Full Time' | ' Part Time' | 'Internship';
	salary: number;
	employee_documents: EmployeeDocuments[];
	created_at: Date;
	updated_at: Date;
}

interface FetchEmployeesArgs {
	query: string;
	page: number;
}

interface FetchEmployeesResponse<T> {
	data: T[];
	totalItems: number;
}

type FetchEmployees<T extends object> = (
	args: FetchEmployeesArgs
) => Promise<FetchEmployeesResponse<T> | undefined>;

// Define a similar structure for performance data fetching
interface FetchPerformanceArgs {
	query: string;
	page: number;
}

interface FetchPerformanceResponse<T> {
	data: T[];
	totalItems: number;
}

type FetchPerformance<T extends object> = (
	args: FetchPerformanceArgs
) => Promise<FetchPerformanceResponse<T> | undefined>;

interface Field {
	label: string;
	type: string;
	name: string;
	options?: { value: string | number; label: string }[] | string[];
	accept?: string;
	required?: boolean;
}

interface DynamicFormProps {
	text: string;
	fields: Field[];
	data: { [key: string]: string | number | undefined };
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	errors: { [key: string]: string };
	extraNode?: React.ReactNode;
	disabled?: boolean;
}

type SetFormData<T> = (formData: T) => void;

interface CustomFormData {
	[key: string]: string | number | undefined; // Keys like 'picture' or 'document'
}

interface DepartmentProps {
	id: number;
	department_name: string;
	designations: DesignationProps[];
	created_at: Date;
	updated_at: Date;
}

interface DesignationProps {
	id: number;
	designation_name: string;
	department_name: string;
}

interface IconProps {
	className?: string;
	dimension?: string;
}

interface AttendanceProps {
	id: number;
	employee_id: string;
	employee_name?: string;
	first_name: string;
	last_name?: string;
	status: string;
	attendance_date: string;
	check_in_time?: string;
	check_out_time?: string;
	late_status?: string;
	late_time?: string;
	total_working_hours?: string;
	overtime?: string;
	created_at?: string;
}

interface MenuItem {
	text: string;
	link: string;
}

interface NavbarProps {
	menuItems: MenuItem[];
}

interface CustomerProps {
	id: number;
	customer_name: string;
	phone_number: string;
	email: string;
	note: string;
	created_at: Date;
	updated_at: Date;
}

interface CustomerAddressProps {
	id: number;
	customer_name: string;
	address_line_1: string;
	address_line_2: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
	address_type: 'billing' | 'shipping';
}

interface PaymentMethodProps {
	id: number;
	method_name: string;
	created_at: Date;
}

interface InvoiceItem {
	id: number;
	item_name: string;
	quantity: number;
	price: number;
	total: number;
	description: string;
	item_discount: number;
}

interface InvoiceProps {
	id: number;
	customer_id: number;
	customer_name: string;
	invoice_date: Date;
	due_date: Date;
	total_amount: number;
	total_paid: number;
	status: string;
	item_name: string;
	quantity: number;
	price: number;
	total: number;
	item_discount: number;
	total_discount: number;
	remaining_amount: string;
	invoice_unique_id: string;
	invoice_items?: InvoiceItem[];
	created_at: Date;
	updated_at: Date;
}

interface CountUpProps {
	targetNumber: number;
	duration: number;
	prefix?: string;
}

interface TransactionProps {
	id: number;
	invoice_id: string;
	invoice_unique_id: string;
	customer_name: string;
	paid_amount: number;
	transaction_type: string;
	method_name: string;
	notes: string;
	transaction_date: string;
	created_at: Date;
	updated_at: Date;
}

type OrganizationProps = {
	organization_name: string;
	addressline_one: string;
	addressline_two?: string;
	company_logo?: string;
	phone: string;
	email: string;
	allowed_ip?: string;
};

interface AccountsReceivableProps {
	id: number;
	invoice_unique_id: string;
	customer_name: string;
	receivable_amount: number;
	payment_status: string;
}

interface AccountsPayableProps {
	id: number;
	invoice_unique_id: string;
	customer_name: string;
	payable_amount: string;
	payment_status: string;
}

interface OptionProps {
	label: string;
	value: number;
	image?: string;
}
type EmployeeFieldType =
	| 'text'
	| 'password'
	| 'custom-select'
	| 'date'
	| 'tel'
	| 'email'
	| 'textarea'
	| 'combobox-dynamic'
	| 'combobox-static'
	| 'number'
	| 'button';

type EmployeeField = {
	tab: number;
	label: string;
	type:
		| 'text'
		| 'password'
		| 'custom-select'
		| 'date'
		| 'tel'
		| 'email'
		| 'textarea'
		| 'combobox-dynamic'
		| 'combobox-static'
		| 'number'
		| 'button'
		| string; // ✅ Ensures type safety
	name: string;
	required?: boolean;
	options?:
		| string[]
		| { label: string; value: number; image: string }[];
};

interface HolidaysProps {
	id: number;
	holiday_name: string;
	start_date: string;
	end_date: string;
	holiday_type:
		| 'Govt Holiday'
		| 'Company Holiday'
		| 'Relegious Holiday'
		| 'Observance';
	holiday_status: 'Approved' | 'Pending' | 'Cancelled';
	description: string;
}
interface LeaveRequestProps {
	id: number;
	employee_id: number;
	first_name: string;
	last_name: string;
	start_date: string;
	end_date: string;
	total_days: number;
	leave_type: string;
	reason: string;
	status: string;
}

interface CalendarDaysProps {
	isHoliday: boolean;
	handleMouseEnter: (e: React.MouseEvent, date: string) => void;
	handleMouseLeave: () => void;
	day: number;
	dateStr: string;
	holidaysOnDate: HolidaysProps[];
	isWeekend: boolean;
}
