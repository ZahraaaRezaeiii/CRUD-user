// UserTable.tsx
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { User } from '../types/userTypes';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1 },
        { field: 'country', headerName: 'Country', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <>
                    <Button onClick={() => onEdit(params.row)}>Edit</Button>
                    <Button onClick={() => onDelete(params.row.id)} color="error">Delete</Button>
                </>
            ),
            flex: 1,
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.id}
            />
        </div>
    );
};

export default UserTable;
