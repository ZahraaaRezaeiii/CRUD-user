import { GridColDef } from '@mui/x-data-grid';
import UserActions from './UserActions';

const UserColumns = (handleEdit: (user: any) => void, deleteMutation: any): GridColDef[] => [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (params) => (
            <UserActions
                userId={params.row.id}
                onEdit={() => handleEdit(params.row)}  // اطمینان حاصل کنید که handleEdit درست کار می‌کند
                onDelete={(id) => deleteMutation.mutate(id)}
            />
        ),
        flex: 1,
    },
];


export default UserColumns;
