import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { User } from '../types/userTypes'; // مطمئن شو که این رو اضافه کردی

interface UserFormProps {
    editId: string | null;
    addMutation: any;
    updateMutation: any;
    setEditId: (id: string | null) => void;
    users: User[];  // اضافه کردن لیست کاربران
}

const UserForm: React.FC<UserFormProps> = ({ editId, addMutation, updateMutation, setEditId, users }) => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    useEffect(() => {
        if (editId) {
            // پیدا کردن کاربر از لیست کاربران
            const userToEdit = users.find((user) => user.id === editId);
            if (userToEdit) {
                setName(userToEdit.name || '');
                setAge(userToEdit.age || '');
                setCountry(userToEdit.country || '');
            }
        } else {
            // اگر کاربری انتخاب نشده باشد، فرم را پاک می‌کنیم
            setName('');
            setAge('');
            setCountry('');
        }
    }, [editId, users]);  // باید editId و users رو به عنوان وابستگی وارد کنیم

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            updateMutation.mutate({ id: editId, user: { name, age, country } });
        } else {
            addMutation.mutate({ name, age, country });
        }
        setName('');
        setAge('');
        setCountry('');
        setEditId(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <TextField
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <Button type="submit" variant="contained">
                    {editId ? 'Edit User' : 'Add User'}
                </Button>
            </Box>
        </form>
    );
};

export default UserForm;
