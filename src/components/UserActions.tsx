import React from 'react';
import { Button } from '@mui/material';

interface UserActionsProps {
    userId: string;
    onEdit: () => void;
    onDelete: (id: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ userId, onEdit, onDelete }) => {
    return (
        <>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={() => onDelete(userId)} color="error">Delete</Button>
        </>
    );
};

export default UserActions;
