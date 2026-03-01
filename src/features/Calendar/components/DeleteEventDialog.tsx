import React from 'react';
import { Button } from '../../../components/Button';

interface DeleteEventDialogProps {
    eventTitle: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
    onCancel,
    onConfirm,
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-sm p-6">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    Deleting Event
                </h2>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Are you sure you want to delete this event?
                </p>

                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    );
};
