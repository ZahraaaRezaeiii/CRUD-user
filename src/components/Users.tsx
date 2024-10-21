import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUsers, addUser, updateUser, deleteUser } from '../services/userService';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import UserForm from './UserForm';
import UserColumns from './UserColumns';
import { User } from '../types/userTypes';

const Users: React.FC = () => {
    const queryClient = useQueryClient();
    const { data: users, isLoading, error } = useQuery<User[], Error>('users', fetchUsers);
    const [editId, setEditId] = useState<string | null>(null);

    const addMutation = useMutation(addUser, {
        onSuccess: () => queryClient.invalidateQueries('users'),
    });

    const updateMutation = useMutation(({ id, user }: { id: string; user: { name: string; age?: string; country?: string } }) => updateUser(id, user), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            setEditId(null);
        },
    });

    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => queryClient.invalidateQueries('users'),
    });

    const handleEdit = (user: User) => {
        setEditId(user.id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const columns = UserColumns(handleEdit, deleteMutation);

    return (
        <Container>
            <h1>Users</h1>
            <UserForm
                editId={editId}
                addMutation={addMutation}
                updateMutation={updateMutation}
                setEditId={setEditId}
                users={users || []}  // ارسال لیست کاربران
            />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users || []}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            </div>
        </Container>
    );
};

export default Users;
