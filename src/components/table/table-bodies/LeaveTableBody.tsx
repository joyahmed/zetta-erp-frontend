import { formatDate } from '@/utils/format-date';
import { lazy } from 'react';

const CrudActions = lazy(() => import('@/components/table/CrudActions'));
const TableCell = lazy(() => import('@/components/table/TableCell'));

interface LeaveTableBodyProps {
  tableData: LeaveRequestProps[] | undefined;
}

const LeaveTableBody = ({ tableData }: LeaveTableBodyProps) => {
  return (
    <tbody>
      {tableData && tableData.length > 0 ? (
        tableData.map((item, index) => (
          <tr
            key={item.id}
            className="border dark:border-sky-500/30 border-l-0 border-r-0 border-b-0"
          >
            <TableCell>
              <CrudActions
                {...{
                  id: item.id,
                  link: '/leave',
                  route: 'leaves',
                  showView: false,
                  showBarcode: false,
                }}
              />
            </TableCell>
            <TableCell text={index + 1} />
            <TableCell text={`${item.first_name} ${item.last_name}` || 'N/A'} />
            <TableCell text={formatDate(item.start_date)} />
            <TableCell text={formatDate(item.end_date)} />
            <TableCell text={item.total_days?.toString() || '-'} />
            <TableCell text={item.leave_type || 'N/A'} />
            <TableCell text={item.reason || '-'} />
            <TableCell text={item.status} />
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={9}
            className="text-center py-4 text-gray-500 dark:text-gray-400 italic"
          >
            No data found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default LeaveTableBody;
